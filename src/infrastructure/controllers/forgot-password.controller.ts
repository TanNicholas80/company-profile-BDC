import { ForgotPasswordUseCase } from "@/application/use-cases/auth/user/forgot-password.use-case"
import { UserRepository } from "../repositories/user.repositories";
import { TokenVerificationService } from "../services/token-verification.service";
import { ResendEmailService } from "../services/resend-email.service";
import { VerifiedRepository } from "../repositories/verified.repository";
import { z } from "zod";
import { InputParsedError } from "@/entities/errors/common";

const userRepository = new UserRepository();
const verifiedRepository = new VerifiedRepository();
const verificationService = new TokenVerificationService(verifiedRepository);
const emailService = new ResendEmailService();

const forgotPasswordUseCase = new ForgotPasswordUseCase(
    userRepository,
    verificationService,
    emailService
);

const inputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

export const forgotPasswordController = async (email: string) => {
    const parsedInput = inputSchema.safeParse({ email });
    if (!parsedInput.success) {
        const errorField = {
            ...parsedInput.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid input", errorField);
    }

    return await forgotPasswordUseCase.execute(parsedInput.data.email);
}
