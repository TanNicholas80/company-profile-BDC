import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { prisma } from "./db";

export async function verifySession(sessionToken: string | undefined) {
    if(!sessionToken) return null;

    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));

    const session = await prisma.sessions.findUnique({
        where: {SessionID: sessionId},
        include: { user: true },
    });

    if(!session || new Date() >= session.expiredAt) {
        return null;
    }

    return {
        userId: session.userId,
        role: session.user.role,
    };
}

export function getRedirectUrlByRole(role: string | undefined): string {
    if (!role) return "/login";
    
    switch (role.toUpperCase()) {
        case "ADMIN":
            return "/dashboard-admin";
        case "USER":
            return "/dashboard-user";
        default:
            return "/login";
    }
}

export async function getSessionAndRedirect(sessionToken: string | undefined) {
    const session = await verifySession(sessionToken);
    
    if (!session) {
        return {
            redirect: "/login",
            session: null
        };
    }

    return {
        redirect: getRedirectUrlByRole(session.role),
        session
    };
}