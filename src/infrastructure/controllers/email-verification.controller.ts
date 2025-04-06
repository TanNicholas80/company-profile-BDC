import { EmailVerificationUseCase } from "@/application/use-cases/auth/user/email-verification.use-case";
import { z } from "zod";
import { TokenVerificationService } from "../services/token-verification.service";
import { UserRepository } from "../repositories/user.repositories";
import { VerifiedRepository } from "../repositories/verified.repository";
import { InputParsedError } from "@/entities/errors/common";
import { SessionRepository } from "../repositories/session.repository";
import { AuthenticationService } from "../services/auth.service";

const verifiedRepository = new VerifiedRepository();
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const verificationService = new TokenVerificationService(verifiedRepository);
const authenticationService = new AuthenticationService(sessionRepository, userRepository);

const emailVerificationUseCase = new EmailVerificationUseCase(
    userRepository,
    verifiedRepository,
    verificationService,
    authenticationService,
);

const inputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    token: z.string().length(4, { message: "Token must be 4 characters long" }),
})

export const emailVerificationController = async (email: string, token: string) => {
    const parsedVerificationInput = inputSchema.safeParse({ email, token });
    if (!parsedVerificationInput.success) {
        const errorField = {
            ...parsedVerificationInput.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid input", errorField);
    }

    return await emailVerificationUseCase.execute(parsedVerificationInput.data.email, parsedVerificationInput.data.token);
}