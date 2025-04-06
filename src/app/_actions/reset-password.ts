"use server";

import { InputParsedError, VerificationError } from "@/entities/errors/common";
import { resetPasswordController } from "@/infrastructure/controllers/reset-password.controller";

export const resetPasswordAction = async (email: string, password: string, confirmPassword: string) => {
    try {
        const result = await resetPasswordController(email, password, confirmPassword);
        return { success: true, data: result };
    } catch(err: unknown) {
        if (err instanceof InputParsedError) {
            return {
                success: false,
                error: {
                    name: err.name,
                    message: err.message,
                    data: err.fields,
                }
            }
        }

        if (err instanceof VerificationError) {
            return {
                success: false,
                error: {
                    name: err.name,
                    message: err.message,
                }
            }
        }

        return {
            success: false,
            error: {
                name: "Error",
                message: "Error when reset password",
            }
        }
    }
}
