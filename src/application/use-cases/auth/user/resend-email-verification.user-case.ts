import EmailVerifyBDC from "@/app/components/email/email-verify";
import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IVerifiedRepository } from "@/application/repositories/verified.repository.interface";
import { IEmailService } from "@/application/services/email.service.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class ResendEmailVerificationUseCase {
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

        // Cek apakah user sudah terverifikasi
        if (findUserByEmail.is_verified) {
            throw new VerificationError("Email sudah terverifikasi");
            return false;
        }
        
        // generate token baru
        const token = this.verificationService.generateTokenVerification();
        const subjectEmail = "Verifikasi Email - Bungah Dental Care";

        // Hapus Token Lama
        await this.verifiedRepository.deleteEmailVerificationByUserId(findUserByEmail.UserID);

        // Simpan Token Baru
        await this.verificationService.createTokenEmailVerification(token, findUserByEmail.UserID);

        // Kirim Email Baru
        await this.emailService.sendEmail(
            EmailVerifyBDC({ token }),
            subjectEmail,
            email
        );

        return true;
    }
}
