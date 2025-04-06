import { Goldar, JK } from "@prisma/client";

// export enum Gender {
//   Perempuan = "Perempuan",
//   Laki_Laki = "Laki_Laki",
// }

// export enum GolonganDarah {
//   A = "A",
//   B = "B",
//   O = "O",
//   AB = "AB",
//   Tidak_Tahu = "Tidak_Tahu",
// }

export interface PasienInfo {
  id: string;
  userId: string;
  NIK: string;
  no_BPJS: string | null;
  jenis_kelamin: JK;
  golongan_darah: Goldar;
  tgl_lahir: Date;
  alergi: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type PasienInfoRecord = Omit<PasienInfo, "createdAt" | "updatedAt" | "deletedAt">

export type PasienInfoCreateInput = Omit<PasienInfoRecord, "id" | "userId">
