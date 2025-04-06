import { VerifiedRecord } from "@/entities/models/verified.models";
import { ForgotPasswordRecord } from "@/entities/models/forgotPassword.model";

export interface IVerificationService {
    generateTokenVerification(): string;
    compareAndValidateToken(plainToken: string, userToken: string, expiresAt: Date): boolean;
    createTokenEmailVerification(token: string, userID: string): Promise<VerifiedRecord>;
    createTokenForgotPassword(token: string, userID: string): Promise<ForgotPasswordRecord>;
}