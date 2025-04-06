import { IEmailService } from "@/application/services/email.service.interface";
import { ReactElement } from "react";
import { Resend } from "resend";

export class ResendEmailService implements IEmailService {
    private resend: Resend;

    constructor() {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("Missing RESEND_API_KEY in environment variables");
        }
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendEmail(emailComponent: ReactElement, subject: string, to: string): Promise<void> {
        try {
            await this.resend.emails.send({
                from: "Utility <no-reply@luthficode.my.id>",
                to,
                subject: subject,
                react: emailComponent,
            });

            console.log(`Email verifikasi berhasil dikirim ke ${to}`);
        } catch (err) {
            console.error("Gagal mengirim email:", err);
            throw new Error("Failed to send email");
        }
    }
}