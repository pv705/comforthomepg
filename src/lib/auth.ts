import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function isAdmin() {
  const session = await getSession();
  if (!session?.user?.email) return false;

  const admin = await prisma.adminUser.findUnique({
    where: { email: session.user.email },
  });
  return !!admin;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
