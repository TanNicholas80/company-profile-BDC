import { ForgotPasswordVerificationUseCase } from "@/application/use-cases/auth/user/forgot-password-verification.use-case"
import { UserRepository } from "../repositories/user.repositories";
import { VerifiedRepository } from "../repositories/verified.repository";
import { TokenVerificationService } from "../services/token-verification.service";
import { z } from "zod";
import { InputParsedError } from "@/entities/errors/common";

const userRepository = new UserRepository();
const verifiedRepository = new VerifiedRepository();
const verificationService = new TokenVerificationService(verifiedRepository);

const forgotPasswordVerificationUseCase = new ForgotPasswordVerificationUseCase(
    userRepository,
    verifiedRepository,
    verificationService
);

const inputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    token: z.string().length(4, { message: "Token must be 4 characters long" }),
})

export const forgotPasswordVerificationController = async (email: string, token: string) => {
    const parsedInput = inputSchema.safeParse({ email, token });
    if (!parsedInput.success) {
        const errorField = {
            ...parsedInput.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid input", errorField);
    }

    return await forgotPasswordVerificationUseCase.execute(parsedInput.data.email, parsedInput.data.token);
}
