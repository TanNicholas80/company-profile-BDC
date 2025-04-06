import { SessionInfoGet } from "@/entities/models/session.models.";

export interface IAuthenticationService {
  generateSessionToken(): string;
  createSession(token: string, userId: string): Promise<string>;
  validateSession(token: string): Promise<SessionInfoGet | null>;
  invalidateSession(sessionId: string): Promise<void>;
}
