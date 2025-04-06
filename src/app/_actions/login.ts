"use server";

import { COOKIE_MAX_AGE, SESSION_COOKIE_NAME } from "@/constants/cookie";
import {
  AuthenticationError,
  InputParsedError,
} from "@/entities/errors/common";
import { loginUserController } from "@/infrastructure/controllers/auth/login.controller";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getRedirectUrlByRole, verifySession } from "@/lib/auth";

export const loginAction = async (email: string, password: string) => {
  try {
    const response = await loginUserController({ email, password });
    const cookieStore = await cookies();

    if (response) {
      // Set session cookie
      cookieStore.set(SESSION_COOKIE_NAME, response, {
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
      });

      // Verifikasi session untuk mendapatkan role
      const session = await verifySession(response);
      if (!session) {
        throw new AuthenticationError("Session tidak valid");
      }

      // Redirect berdasarkan role dari session
      const redirectUrl = getRedirectUrlByRole(session.role);
      console.log(session.role);
      redirect(redirectUrl);
    } else {
      throw new AuthenticationError("Pembuatan Session Error");
    }
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

    if (err instanceof AuthenticationError) {
      return {
        success: false,
        error: {
          name: err.name,
          message: err.message,
          data: null,
        },
      };
    }

    return {
      success: false,
      error: {
        name: "Error",
        message: "Terjadi kesalahan saat login!",
      },
    };
  }
};
