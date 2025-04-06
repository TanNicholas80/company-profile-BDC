import { IVerificationService } from "@/application/services/verification.service.interface";
import { v4 as uuidv4 } from "uuid";
import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { VerifiedRecord } from "@/entities/models/verified.models";
import { ForgotPasswordRecord } from "@/entities/models/forgotPassword.model";

export class TokenVerificationService implements IVerificationService {
    constructor(private verifiedRepository: IVerifiedRepository) {}

    generateTokenVerification(): string {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const token = (1000 + (array[0] % 9000)).toString();
        return token;
    }

    compareAndValidateToken(
        plainToken: string,
        userToken: string,
        expiresAt: Date
    ): boolean {
        const isTokenMatch = plainToken === userToken;
        const isNotExpired = new Date() < new Date(expiresAt);

        return isTokenMatch && isNotExpired;
    }

    async createTokenEmailVerification(
        token: string,
        userID: string
    ): Promise<VerifiedRecord> {
        const verified: VerifiedRecord = {
            verifiedId: uuidv4(),
            userId: userID,
            expiredAt: new Date(Date.now() + 10 * 60 * 1000),
            token: token,     
        };

        try {
            await this.verifiedRepository.insertVerified(verified);
            return verified;
        } catch (err) {
            console.error("Error inserting verified token:", err);
            throw new Error("Failed to create token verification");
        }
    }

    async createTokenForgotPassword(
        token: string,
        userID: string
    ): Promise<ForgotPasswordRecord> {
        const forgotPassword: ForgotPasswordRecord = {
            ForgotPasswordID: uuidv4(),
            userId: userID,
            token: token,
            expiredAt: new Date(Date.now() + 10 * 60 * 1000),
        };

        try {
            await this.verifiedRepository.insertForgotPassword(forgotPassword);
            return forgotPassword;
        } catch (err) {
            console.error("Error inserting forgot password token:", err);
            throw new Error("Failed to create token forgot password");
        }
    }
}