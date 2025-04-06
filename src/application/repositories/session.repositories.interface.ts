import { SessionsRecord } from "@/entities/models/session.models.";

export interface ISessionRepository {
    findBySessionId(sessionId: string): Promise<SessionsRecord | null>;
    insertSession(sessionData: SessionsRecord): Promise<boolean>;
    deleteSession(sessionId: string): Promise<void>;
    updateSession(sessionData: SessionsRecord): Promise<void>;  
}