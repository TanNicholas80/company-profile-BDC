"use server";

import { InputParsedError, VerificationError } from "@/entities/errors/common";
import { resendForgotPasswordController } from "@/infrastructure/controllers/resend-forgot-password.controller";

export const resendForgotPasswordAction = async (email: string) => {
    try {
        const result = await resendForgotPasswordController(email);
        return { success: true, data: result };
    } catch (error) {
        if (error instanceof InputParsedError) {
            return {
                success: false,
                error: {
                    name: error.name,
                    message: error.message,
                    data: error.fields,
                },
            };
        }

        if (error instanceof VerificationError) {
            return {
                success: false,
                error: {
                    name: error.name,
                    message: error.message,
                },
            };
        }

        return {
            success: false,
            error: {
                name: "Error",
                message: "Terjadi kesalahan saat mengirim ulang kode reset password",
            },
        };
    }
}
