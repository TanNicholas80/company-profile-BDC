import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class TransactionService {
  async startTransaction<T>(
    clb: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return await prisma.$transaction(clb);
  }
}
