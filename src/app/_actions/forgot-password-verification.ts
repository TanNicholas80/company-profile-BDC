"use server";

import { InputParsedError, VerificationError } from "@/entities/errors/common";
import { forgotPasswordVerificationController } from "@/infrastructure/controllers/forgot-password-verification.controller";
import { redirect } from "next/navigation";

export const forgotPasswordVerificationAction = async (email: string, token: string) => {
    try {
        const result = await forgotPasswordVerificationController(email, token);
        redirect(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
        return { success: true, data: result };
    } catch(err: unknown) {
        if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;

        if (err instanceof InputParsedError) {
            return {
                success: false,
                error: {
                    name: err.name,
                    message: err.message,
                    data: err.fields,
                },
            };
        }

        if (err instanceof VerificationError) {
            return {
                success: false,
                error: {
                    name: err.name,
                    message: err.message,
                },
            };
        }

        return {
            success: false,
            error: {
                name: "Error",
                message: "An error occured while Verifying Forgot Password",
            },
        }
    }
}
