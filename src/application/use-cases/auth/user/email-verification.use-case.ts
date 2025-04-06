import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class EmailVerificationUseCase {
    constructor(
        private userRepository: IUserRepository,
        private verifiedRepository: IVerifiedRepository,
        private verificationService: IVerificationService,
        private authenticationService: IAuthenticationService,
    ) {}
    async execute(email: string, token: string): Promise<string> {
        // Lakukan Pencarian Verifikasi Berdasarkan Token
        const findUserByEmail = await this.userRepository.findUserByEmail(email);
        if (!findUserByEmail) {
            throw new VerificationError("Sorry, email not found");
        }
        const findEmailVerificationByToken = await this.verifiedRepository.findEmailVerificationByUserID(findUserByEmail.UserID);
        if (!findEmailVerificationByToken) {
            throw new VerificationError("Sorry, your verification not ready");
        }
        // Lakukan Validasi Token
        const isTokenValid = this.verificationService.compareAndValidateToken(token, findEmailVerificationByToken.token, findEmailVerificationByToken.expiredAt);
        if (!isTokenValid) {
            throw new VerificationError("Invalid or expired token. Please request a new verification email.");
        }
        const sessionToken = this.authenticationService.generateSessionToken();
        await this.authenticationService.createSession(sessionToken, findUserByEmail.UserID);
        // Lakukan Update Status Verifikasi
        await this.userRepository.updateStatusVerification(findEmailVerificationByToken.userId);
        return sessionToken;
    }
}
