import { PrismaClient } from "@prisma/client"

// Add explicit types to ensure all models are accessible
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

