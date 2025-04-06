export interface ForgotPassword {
    ForgotPasswordID: string;
    userId: string;
    token: string;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type ForgotPasswordRecord = Omit<ForgotPassword, "createdAt" | "updatedAt" | "deletedAt">