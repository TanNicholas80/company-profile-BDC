import { ForgotPasswordRecord } from "@/entities/models/forgotPassword.model";
import { VerifiedRecord } from "@/entities/models/verified.models";

export interface IVerifiedRepository {
    findEmailVerificationByUserID(userId: string): Promise<VerifiedRecord | null>;
    findForgotPasswordByUserID(userId: string): Promise<ForgotPasswordRecord | null>;
    insertVerified(verifiedData: VerifiedRecord): Promise<boolean>;
    insertForgotPassword(forgotPasswordData: ForgotPasswordRecord): Promise<boolean>;
    deleteEmailVerificationByUserId(userId: string): Promise<boolean>;
    deleteForgotPasswordByUserId(userId: string): Promise<boolean>;
}