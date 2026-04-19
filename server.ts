import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { prisma } from './src/lib/prisma';

const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // ---------------------------------------------------------------------------
  // APRA LMS - BACKEND API ROUTES
  // ---------------------------------------------------------------------------
  
  // Health Check
  app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', version: '1.0.0', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
  });

  // Example: Users Module
  app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
  app.post('/api/auth/login', (req, res) => {
    res.json({ token: 'mock-jwt-token', user: { id: 1, role: 'ADMIN' } });
  });

  // Example: Courses Module Stub
  app.get('/api/courses', (req, res) => {
    res.json([
      { id: '1', title: 'Enterprise Software Architecture', students: 120 },
      { id: '2', title: 'Advanced Fullstack Development', students: 85 }
    ]);
  });

  // ---------------------------------------------------------------------------
  // VITE MIDDLEWARE (Frontend Delivery)
  // ---------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: use Vite's development server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 APRA LMS Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start server", e);
  process.exit(1);
});
