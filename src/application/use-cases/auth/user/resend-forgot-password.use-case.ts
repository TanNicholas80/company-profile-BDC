import EmailForgotPasswordBDC from "@/app/components/email/email-forgot-password";
import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { IEmailService } from "@/application/services/email.service.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class ResendForgotPasswordUseCase {
    constructor(
        private userRepository: IUserRepository,
        private verifiedRepository: IVerifiedRepository,
        private verificationService: IVerificationService,
        private emailService: IEmailService,
    ) {}

    async execute(email: string): Promise<boolean> {
        // Cari user berdasarkan email
        const findUserByEmail = await this.userRepository.findUserByEmail(email);
        if (!findUserByEmail) {
            throw new VerificationError("Email tidak ditemukan");
            return false;
        }
        
        // generate token baru
        const token = this.verificationService.generateTokenVerification();
        const subjectEmail = "Reset Password - Bungah Dental Care";

        // Hapus Token Lama
        await this.verifiedRepository.deleteForgotPasswordByUserId(findUserByEmail.UserID);

        // Simpan Token Baru
        await this.verificationService.createTokenForgotPassword(token, findUserByEmail.UserID);
        
        // Kirim Email Baru
        await this.emailService.sendEmail(
            EmailForgotPasswordBDC({ token }),
            subjectEmail,
            email
        );

        return true;
    }
}
