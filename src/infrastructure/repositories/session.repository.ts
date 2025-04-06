import { ISessionRepository } from "@/application/repositories/session.repositories.interface";
import { SessionsRecord } from "@/entities/models/session.models.";
import { prisma } from "@/lib/db";

export class SessionRepository implements ISessionRepository {
    async findBySessionId(sessionId: string): Promise<SessionsRecord | null> {
        const session = await prisma.sessions.findUnique({
            where: { SessionID: sessionId }
        });
        return session;
    }
    async insertSession(sessionData: SessionsRecord): Promise<boolean> {
        try {
            // Cek apakah user sudah memiliki session
            const existingSession = await prisma.sessions.findFirst({
                where: { userId: sessionData.userId }
            });

            if (existingSession) {
                // Jika ada session lama, hapus dulu
                await prisma.sessions.delete({
                    where: { SessionID: existingSession.SessionID }
                });
            }

            // Buat session baru
            await prisma.sessions.create({
                data: sessionData
            });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    async deleteSession(sessionId: string): Promise<void> {
        await prisma.sessions.delete({
            where: { SessionID: sessionId }
        });
        return;
    }
    async updateSession(sessionData: SessionsRecord): Promise<void> {
        await prisma.sessions.update({
            where: { SessionID: sessionData.SessionID },
            data: { expiredAt: sessionData.expiredAt }
        });
        return;
    }
}
