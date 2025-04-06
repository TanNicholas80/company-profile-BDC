import { ReactElement } from "react";

export interface IEmailService {
    sendEmail(emailComponent: ReactElement, subject: string, to: string): Promise<void>;
}