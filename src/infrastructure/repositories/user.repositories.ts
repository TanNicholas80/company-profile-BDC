import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { UserRecord } from "@/entities/models/user.models";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class UserRepository implements IUserRepository {
    async findUserByEmailOrPhone(email: string, phone: string): Promise<UserRecord | null> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { no_telp: phone }],
            }
        });
        return user;
    }
    async findUserByEmail(email: string): Promise<UserRecord | null> {
        const user = await prisma.user.findFirst({
            where: { email: email },
        });
        return user;
    }
    async insertUser(user: UserRecord, tx?: Prisma.TransactionClient): Promise<void> {
        const client = tx || prisma;
        await client.user.create({
            data: user,
        });
    }
    async updateStatusVerification(userId: string): Promise<void> {
        await prisma.user.update({
            where: { UserID: userId },
            data: { is_verified: true },
        });
    }
    async updatePassword(userId: string, password: string): Promise<void> {
        await prisma.user.update({
            where: { UserID: userId },
            data: { password: password },
        });
    }
    async findUserById(userId: string): Promise<UserRecord | null> {
        const user = await prisma.user.findUnique({
            where: { UserID: userId },
        });
        return user;
    }
}