import { UserRecord } from "@/entities/models/user.models";
import { Prisma } from "@prisma/client";

export interface IUserRepository {
    insertUser(user: UserRecord, tx?: Prisma.TransactionClient): Promise<void>;
    findUserByEmailOrPhone(email: string, phone: string): Promise<UserRecord | null>;
    findUserByEmail(email: string): Promise<UserRecord | null>;
    updateStatusVerification(userId: string): Promise<void>;
    updatePassword(userId: string, password: string): Promise<void>;
    findUserById(userId: string): Promise<UserRecord | null>;
}