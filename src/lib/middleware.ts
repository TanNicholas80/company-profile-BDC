import { SESSION_COOKIE_NAME } from "@/constants/cookie";
import { NextRequest, NextResponse } from "next/server";
import { getSessionAndRedirect } from "./auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME);
    
    // Dapatkan session dan URL redirect yang sesuai
    const { redirect, session } = await getSessionAndRedirect(sessionToken?.value);

    // Jika tidak ada session, redirect ke login
    if (!session) {
        const response = NextResponse.redirect(new URL(redirect, req.url));
        if (sessionToken) {
            response.cookies.delete(SESSION_COOKIE_NAME);
        }
        return response;
    }

    // Jika user mencoba mengakses halaman login, redirect ke dashboard sesuai role
    if (pathname === "/login") {
        return NextResponse.redirect(new URL(redirect, req.url));
    }

    // Jika admin mencoba mengakses halaman user
    if (session.role === "ADMIN" && pathname.startsWith("/dashboard-user")) {
        return NextResponse.redirect(new URL("/dashboard-admin", req.url));
    }

    // Jika user mencoba mengakses halaman admin
    if (session.role !== "ADMIN" && pathname.startsWith("/dashboard-admin")) {
        return NextResponse.redirect(new URL("/dashboard-user", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard-admin/:path*', '/dashboard-user/:path*']
}
