"use server";

import { InputParsedError, VerificationError } from "@/entities/errors/common";
import { forgotPasswordController } from "@/infrastructure/controllers/forgot-password.controller";
import { redirect } from "next/navigation";

export const forgotPasswordAction = async (
    email: string,
) => {
    try {
        const result = await forgotPasswordController(email);
        redirect(`/forgot-password/verify?email=${encodeURIComponent(email)}`);
        return { success: true, data: result };
    } catch (err: unknown) {
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
                message: "An error occured while Requesting Forgot Password",
            },
        };
    }
}