import { ResendEmailVerificationUseCase } from "@/application/use-cases/auth/user/resend-email-verification.user-case";
import { UserRepository } from "../repositories/user.repositories";
import { VerifiedRepository } from "../repositories/verified.repository"
import { ResendEmailService } from "../services/resend-email.service";
import { TokenVerificationService } from "../services/token-verification.service";
import { z } from "zod";
import { InputParsedError, VerificationError } from "@/entities/errors/common";

const verifiedRepository = new VerifiedRepository();
const userRepository = new UserRepository();
const verificationService = new TokenVerificationService(verifiedRepository);
const emailService = new ResendEmailService();

const resendEmailVerificationUseCase = new ResendEmailVerificationUseCase(
    userRepository,
    verifiedRepository,
    verificationService,
    emailService,
);

const inputSchema = z.object({
    email: z.string().email({ message: "Format email tidak valid" }),
});

export const resendEmailVerificationController = async (email: string) => {
    try {
        const parsedResendVerificationInput = inputSchema.safeParse({ email });
        if (!parsedResendVerificationInput.success) {
            const errorField = {
                ...parsedResendVerificationInput.error?.flatten().fieldErrors,
            };
            throw new InputParsedError("Invalid input", errorField);
        }

        // kirim ulang token
        const result = await resendEmailVerificationUseCase.execute(parsedResendVerificationInput.data.email);
        return { success: true, data: result };
    } catch (err) {
        if (err instanceof InputParsedError || err instanceof VerificationError) {
            throw err;
        }
        throw new VerificationError("Terjadi kesalahan saat mengirim ulang kode verifikasi");
    }
}