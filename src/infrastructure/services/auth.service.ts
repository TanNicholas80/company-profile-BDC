import { ISessionRepository } from "@/application/repositories/session.repositories.interface";
import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import {
    encodeBase32LowerCaseNoPadding,
    encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { SessionInfoGet, SessionsRecord } from "@/entities/models/session.models.";
import { AuthenticationError } from "@/entities/errors/common";


export class AuthenticationService implements IAuthenticationService {
    private SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
    private SESSION_REFRESH_TIME = 1000 * 60 * 60 * 24 * 15;

    constructor(
        private sessionRepository: ISessionRepository,
        private userRepository: IUserRepository,
    ) {}

    generateSessionToken(): string {
        const bytes = new Uint8Array(20);
        crypto.getRandomValues(bytes);
        const token = encodeBase32LowerCaseNoPadding(bytes);
        return token;
    }

    async createSession(token: string, userId: string): Promise<string> {
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
        const session: SessionsRecord = {
            SessionID: sessionId,
            userId: userId,
            expiredAt: new Date(Date.now() + this.SESSION_EXPIRATION_TIME),
        }
        try {
            await this.sessionRepository.insertSession(session);
            return token;
        } catch (err) {
            console.error(err);
            throw new AuthenticationError("Failed to create session");
        }
    }

    async invalidateSession(sessionId: string): Promise<void> {
        await this.sessionRepository.deleteSession(sessionId);
    }

    async validateSession(token: string): Promise<SessionInfoGet | null> {
        const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
        
        const sessionData = await this.sessionRepository.findBySessionId(sessionId);
        if (!sessionData) {
            return null;
        }

        if (Date.now() >= sessionData.expiredAt.getTime()) {
            await this.sessionRepository.deleteSession(sessionId);
            return null;
        }

        if (
            Date.now() >=
            sessionData.expiredAt.getTime() - this.SESSION_REFRESH_TIME
        ) {
            sessionData.expiredAt = new Date(
                Date.now() + this.SESSION_EXPIRATION_TIME
            );

            await this.sessionRepository.updateSession(sessionData);
        }

        const userData = await this.userRepository.findUserById(
            sessionData.userId
        );

        if (!userData) {
            throw new AuthenticationError("User not Found!");
        }

        return {
            SessionID: sessionData.SessionID,
            userId: sessionData.userId,
            expiredAt: sessionData.expiredAt,
            user: userData,
        };
    }
}