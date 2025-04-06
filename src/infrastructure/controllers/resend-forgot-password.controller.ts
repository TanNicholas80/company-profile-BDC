import { ResendForgotPasswordUseCase } from "@/application/use-cases/auth/user/resend-forgot-password.use-case";
import { UserRepository } from "../repositories/user.repositories";
import { VerifiedRepository } from "../repositories/verified.repository";
import { ResendEmailService } from "../services/resend-email.service";
import { TokenVerificationService } from "../services/token-verification.service";
import { z } from "zod";
import { InputParsedError, VerificationError } from "@/entities/errors/common";

const userRepository = new UserRepository();
const verifiedRepository = new VerifiedRepository();
const verificationService = new TokenVerificationService(verifiedRepository);
const emailService = new ResendEmailService();

const resendForgotPasswordUseCase = new ResendForgotPasswordUseCase(
    userRepository,
    verifiedRepository,
    verificationService,
    emailService
);

const inputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const resendForgotPasswordController = async (email: string) => {
    try {
        const parsedResendForgotPasswordInput = inputSchema.safeParse({ email });
        if (!parsedResendForgotPasswordInput.success) {
            const errorField = {
                ...parsedResendForgotPasswordInput.error?.flatten().fieldErrors,
            };
            throw new InputParsedError("Invalid input", errorField);
        }

        const result = await resendForgotPasswordUseCase.execute(parsedResendForgotPasswordInput.data.email);
        return { success: true, data: result };
    } catch (err) {
        if (err instanceof InputParsedError || err instanceof VerificationError) {
            throw err;
        }
        throw new VerificationError("Terjadi kesalahan saat mengirim ulang kode reset password");
    }
}