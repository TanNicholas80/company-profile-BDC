export interface Verified {
  verifiedId: string;
  userId: string;
  token: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type VerifiedRecord = Omit<Verified, "createdAt" | "updatedAt" | "deletedAt">