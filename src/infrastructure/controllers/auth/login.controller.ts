import { LoginUserCase } from "@/application/use-cases/auth/user/login.use-case";
import { InputParsedError } from "@/entities/errors/common";
import { SessionRepository } from "@/infrastructure/repositories/session.repository";
import { UserRepository } from "@/infrastructure/repositories/user.repositories";
import { AuthenticationService } from "@/infrastructure/services/auth.service";
import { PasswordService } from "@/infrastructure/services/password.service";
import { z } from "zod";

const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const passwordService = new PasswordService();
const authenticationService = new AuthenticationService(
    sessionRepository,
    userRepository
);

const loginUserUseCase = new LoginUserCase(
    userRepository,
    passwordService,
    authenticationService
);

const inputSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(8),
});

export const loginUserController = async(input: {
    email: string,
    password: string,
}) => {
    const parsedLoginSchema = inputSchema.safeParse(input);

    if (!parsedLoginSchema.success) {
        const errorField = {
            ...parsedLoginSchema.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid input", errorField);
    }

    return await loginUserUseCase.execute(parsedLoginSchema.data.email, parsedLoginSchema.data.password);
}