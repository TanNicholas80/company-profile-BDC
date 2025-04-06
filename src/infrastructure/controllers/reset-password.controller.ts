import { ResetPasswordUseCase } from "@/application/use-cases/auth/user/reset-password.use-case";
import { UserRepository } from "../repositories/user.repositories";
import { PasswordService } from "../services/password.service";
import { z } from "zod";
import { InputParsedError } from "@/entities/errors/common";

const userRepository = new UserRepository();
const passwordService = new PasswordService();

const resetPasswordUseCase = new ResetPasswordUseCase(
    userRepository,
    passwordService
);

const inputSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
})

export const resetPasswordController = async (email: string, password: string, confirmPassword: string) => {
    const parsedInput = inputSchema.safeParse({ email, password, confirmPassword });
    if (!parsedInput.success) {
        const errorField = {
            ...parsedInput.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid input", errorField);
    }

    return await resetPasswordUseCase.execute(parsedInput.data.email, parsedInput.data.password, parsedInput.data.confirmPassword);
}
