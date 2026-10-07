import { PrismaClient } from '@prisma/client';
import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';
const prisma = new PrismaClient();
const scrypt = promisify(scryptCallback);

async function main() {
  for (const [name, description] of [
    ['SUPER_ADMIN', 'System Administrator with full access'],
    ['TEACHER', 'Faculty / Course Instructor'],
    ['STUDENT', 'Enrolled Student'],
  ]) {
    await prisma.role.upsert({ where: { name }, update: {}, create: { name, description } });
  }
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (!password || password.length < 12) throw new Error('Configura ADMIN_INITIAL_PASSWORD (mínimo 12 caracteres) para crear el administrador.');
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64) as Buffer;
  const passwordHash = 'scrypt$' + salt.toString('hex') + '$' + hash.toString('hex');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@apra.edu.com' },
    update: { passwordHash, isActive: true },
    create: { email: 'admin@apra.edu.com', passwordHash, firstName: 'Francisco', lastName: 'SM', isActive: true }
  });
  const role = await prisma.role.findUniqueOrThrow({ where: { name: 'SUPER_ADMIN' } });
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: role.id } },
    update: {}, create: { userId: adminUser.id, roleId: role.id }
  });
  console.log('Administrador actualizado. No se muestra la contraseña.');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
