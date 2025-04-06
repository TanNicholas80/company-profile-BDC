import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class ForgotPasswordVerificationUseCase {
    constructor(
        private userRepository: IUserRepository,
        private verifiedRepository: IVerifiedRepository,
        private verificationService: IVerificationService,
    ) {}
    async execute(email: string, token: string): Promise<boolean> {
        const findUserByEmail = await this.userRepository.findUserByEmail(email);
        if (!findUserByEmail) {
            throw new VerificationError("Sorry, email not found");
            return false;
        }
        const findForgotPasswordByUserID = await this.verifiedRepository.findForgotPasswordByUserID(findUserByEmail.UserID);
        if (!findForgotPasswordByUserID) {
            throw new VerificationError("Sorry, your verification not ready");
            return false;
        }
        const isTokenValid = this.verificationService.compareAndValidateToken(token, findForgotPasswordByUserID.token, findForgotPasswordByUserID.expiredAt);
        if (!isTokenValid) {
            throw new VerificationError("Invalid or expired token. Please request a new reset password code.");
            return false;
        }
        return true;
    }
}
