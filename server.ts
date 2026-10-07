import express, { type Request, type Response, type NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import path from 'node:path';
import { prisma } from './src/lib/prisma';

const scrypt = promisify(scryptCallback);
const PORT = Number(process.env.PORT || 3000);
const authSecret = process.env.AUTH_SECRET;
if (!authSecret || authSecret.length < 32) {
  throw new Error('AUTH_SECRET debe configurarse con al menos 32 caracteres.');
}

type Session = { userId: string; role: string; exp: number };
type AuthedRequest = Request & { session?: Session };
const encode = (v: unknown) => Buffer.from(JSON.stringify(v)).toString('base64url');
function issueToken(session: Session) {
  const body = encode(session);
  const mac = createHmac('sha256', authSecret!).update(body).digest('base64url');
  return body + '.' + mac;
}
function verifyToken(token: string): Session | null {
  const [body, mac, extra] = token.split('.');
  if (!body || !mac || extra) return null;
  const expected = createHmac('sha256', authSecret!).update(body).digest();
  let supplied: Buffer;
  try { supplied = Buffer.from(mac, 'base64url'); } catch { return null; }
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;
  try {
    const session = JSON.parse(Buffer.from(body, 'base64url').toString()) as Session;
    return typeof session.userId === 'string' && typeof session.role === 'string' && Number.isFinite(session.exp) && session.exp > Date.now() ? session : null;
  } catch { return null; }
}
async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const session = header?.startsWith('Bearer ') ? verifyToken(header.slice(7)) : null;
  if (!session) { res.status(401).json({ error: 'Autenticación requerida' }); return; }
  try {
    const user = await prisma.user.findUnique({ where: { id: session.userId }, include: { roles: { include: { role: true } } } });
    if (!user?.isActive || !user.roles.some(r => r.role.name === session.role)) {
      res.status(401).json({ error: 'Sesión inválida' }); return;
    }
    req.session = session;
    next();
  } catch { res.status(500).json({ error: 'Error validando sesión' }); }
}
function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!['SUPER_ADMIN', 'INSTITUTION_ADMIN'].includes(req.session?.role || '')) {
    res.status(403).json({ error: 'Acceso restringido' }); return;
  }
  next();
}
async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));
  app.get('/api/health', async (_req, res) => {
    try { await prisma.$queryRaw`SELECT 1`; res.json({ status: 'ok', database: 'connected' }); }
    catch { res.status(503).json({ status: 'error', database: 'disconnected' }); }
  });
  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 1024 || !email || !password) {
      res.status(400).json({ error: 'Credenciales inválidas' }); return;
    }
    try {
      const user = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
        include: { roles: { include: { role: true } } }
      });
      let valid = false;
      if (user?.passwordHash?.startsWith('scrypt$')) {
        const parts = user.passwordHash.split('$');
        if (parts.length === 3 && /^[a-f0-9]{32}$/.test(parts[1]) && /^[a-f0-9]{128}$/.test(parts[2])) {
          const candidate = await scrypt(password, Buffer.from(parts[1], 'hex'), 64) as Buffer;
          valid = timingSafeEqual(candidate, Buffer.from(parts[2], 'hex'));
        }
      }
      if (!valid || !user?.isActive) { res.status(401).json({ error: 'Correo o contraseña incorrectos' }); return; }
      const role = user.roles[0]?.role.name ?? 'STUDENT';
      const token = issueToken({ userId: user.id, role, exp: Date.now() + 8 * 60 * 60 * 1000 });
      res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role } });
    } catch { res.status(500).json({ error: 'Error del servidor' }); }
  });
  app.get('/api/users', requireAuth, requireAdmin, async (_req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, firstName: true, lastName: true, isActive: true, lastLogin: true, createdAt: true,
          roles: { select: { role: { select: { name: true } } } } },
        orderBy: { createdAt: 'desc' }
      });
      res.json(users);
    } catch { res.status(500).json({ error: 'No se pudieron consultar los usuarios' }); }
  });
  app.get('/api/courses', requireAuth, async (req: AuthedRequest, res) => {
    try {
      const courses = await prisma.course.findMany({
        where: req.session?.role === 'STUDENT' ? { isPublished: true } : {},
        orderBy: { createdAt: 'asc' },
        include: { _count: { select: { sections: true, modules: true } } }
      });
      res.json(courses);
    } catch { res.status(500).json({ error: 'No se pudieron consultar los cursos' }); }
  });
  app.get('/api/folders', requireAuth, async (_req, res) => {
    try {
      const folders = await prisma.folder.findMany({ where: { parentId: null }, include: { _count: { select: { files: true, children: true } } } });
      res.json(folders);
    } catch { res.status(500).json({ error: 'No se pudieron consultar las carpetas' }); }
  });
  app.get('/api/files', requireAuth, async (_req, res) => {
    try {
      const files = await prisma.file.findMany({ select: { id: true, name: true, mimeType: true, sizeBytes: true, createdAt: true }, orderBy: { createdAt: 'desc' }, take: 10 });
      res.json(files.map(f => ({ ...f, sizeBytes: f.sizeBytes.toString() })));
    } catch { res.status(500).json({ error: 'No se pudieron consultar los archivos' }); }
  });
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get(/.*/, (_req, res) => { res.sendFile(path.join(distPath, 'index.html')); });
  }
  app.listen(PORT, '0.0.0.0', () => console.log('APRA LMS listening on port ' + PORT));
}
startServer().catch(e => { console.error(e); process.exit(1); });
