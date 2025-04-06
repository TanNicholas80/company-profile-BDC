import EmailForgotPasswordBDC from "@/app/components/email/email-forgot-password";
import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IEmailService } from "@/application/services/email.service.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class ForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private verificationService: IVerificationService,
    private emailService: IEmailService
  ) {}

  async execute(email: string): Promise<boolean> {
    // Lakukan Pencarian User Berdasarkan Email
    const findUserByEmail = await this.userRepository.findUserByEmail(email);
    if (!findUserByEmail) {
      throw new VerificationError("Sorry, email not found");
      return false;
    }
    // Lakukan Generate Token
    const token = this.verificationService.generateTokenVerification();
    const subjectEmail = "Reset Password - Bungah Dental Care";

    await this.verificationService.createTokenForgotPassword(
      token,
      findUserByEmail.UserID
    );
    await this.emailService.sendEmail(
      EmailForgotPasswordBDC({
        token: token,
      }),
      subjectEmail,
      findUserByEmail.email
    );

    return true;
  }
}
