"use server";

import { InputParsedError, VerificationError } from "@/entities/errors/common";
import { resendEmailVerificationController } from "@/infrastructure/controllers/resend-email-verification.controller";

export const resendVerificationAction = async (email: string) => {
    try {
        const result = await resendEmailVerificationController(email);
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

        console.error(error);
        return {
            success: false,
            error: {
                name: "Error",
                message: "Terjadi kesalahan saat mengirim ulang kode verifikasi",
            },
        };
    }
}; 