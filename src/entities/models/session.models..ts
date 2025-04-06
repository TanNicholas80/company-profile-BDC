import { UserInfoGet } from "./user.models";

export interface Sessions {
  SessionID: string;
  userId: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type SessionsRecord = Omit<Sessions, "createdAt" | "updatedAt" | "deletedAt">

export type SessionInfoGet = (SessionsRecord & { user: UserInfoGet }) | null;
