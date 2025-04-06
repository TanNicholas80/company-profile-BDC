import { PasienInfoRecord } from "@/entities/models/pasien.models";
import { Prisma } from "@prisma/client";

export interface IPasienInfoRepository {
    insertPasienInfo(pasienInfo: PasienInfoRecord, tx?: Prisma.TransactionClient): Promise<void>;
    findPasienByNoBPJSOrNIK(no_BPJS: string | null, nik: string): Promise<PasienInfoRecord | null>;
}