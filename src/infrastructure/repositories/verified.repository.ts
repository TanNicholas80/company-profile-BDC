import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { ForgotPasswordRecord } from "@/entities/models/forgotPassword.model";
import { VerifiedRecord } from "@/entities/models/verified.models";
import { prisma } from "@/lib/db";

export class VerifiedRepository implements IVerifiedRepository {
    async findEmailVerificationByUserID(userId: string): Promise<VerifiedRecord | null> {
        const verification = await prisma.verified.findFirst({
            where: { userId: userId }
        });
        return verification;
    }
    async findForgotPasswordByUserID(userId: string): Promise<ForgotPasswordRecord | null> {
        const forgotPassword = await prisma.forgotPassword.findFirst({
            where: { userId: userId }
        });
        return forgotPassword;
    }
    async insertVerified(verifiedData: VerifiedRecord): Promise<boolean> {
        try {
            await prisma.verified.create({
                data: verifiedData,
            });
            return true;
        } catch (err) {
            throw new Error(`Failed to insert verified data: ${err}`);
        }
    }
    async insertForgotPassword(forgotPasswordData: ForgotPasswordRecord): Promise<boolean> {
        try {
            await prisma.forgotPassword.create({
                data: forgotPasswordData,
            });
            return true;
        } catch (err) {
            throw new Error(`Failed to insert forgot password data: ${err}`);
        }
    }
    async deleteEmailVerificationByUserId(userId: string): Promise<boolean> {
        try {
            await prisma.verified.delete({
                where: { userId: userId }
            });
            return true;
        } catch (err) {
            throw new Error(`Failed to delete verified data: ${err}`);
        }
    }
    async deleteForgotPasswordByUserId(userId: string): Promise<boolean> {
        try {
            await prisma.forgotPassword.delete({
                where: { userId: userId }
            });
            return true;
        } catch (err) {
            throw new Error(`Failed to delete forgot password data: ${err}`);
        }
    }
}