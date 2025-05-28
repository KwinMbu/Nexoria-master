
import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasourceUrl: process.env.POSTGRES_URL_NON_POOLING,
    datasources: {
      db: {
        url: process.env.POSTGRES_URL_NON_POOLING
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;