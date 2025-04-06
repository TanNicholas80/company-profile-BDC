"use server";

import { COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/constants/cookie";
import { AuthenticationError, InputParsedError } from "@/entities/errors/common";
import { emailVerificationController } from "@/infrastructure/controllers/email-verification.controller";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyEmailAction = async (
    email: string,
    token: string
) => {
    try {
        const response = await emailVerificationController(email, token);
        const cookieStore = await cookies();

        if (response) {
            cookieStore.set(SESSION_COOKIE_NAME, response, {
                httpOnly: true,
                maxAge: COOKIE_MAX_AGE,
            })
        } else {
            throw new AuthenticationError("Error creating session!");
        }
        
        redirect('/dashboard-user');
        return { success: true, error: {} };
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
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

        if (error instanceof AuthenticationError) {
            return {
                success: false,
                error: {
                    name: error.name,
                    message: error.message,
                    data: null,
                },
            };
        }
        console.error(error);
        return {
            success: false,
            error: {
                name: "Error",
                message: "Error happened when authenticated your account!",
            },
        };
    }
}
