import { Role } from "@prisma/client";

// export enum UserRole {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }

export interface User {
  UserID: string;
  email: string;
  nama: string;
  password: string;
  no_telp: string;
  alamat: string;
  Foto: string | null;
  is_verified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserRecord = Omit<User, "createdAt" | "updatedAt" | "deletedAt">

export type UserCreateInput = Omit<UserRecord, "UserID"> & {
    confirm_password: string;
};

export type UserFormInput = Omit<UserCreateInput, "is_verified" | "role" >;

export type UserInfoGet = Omit<UserRecord, "password">;