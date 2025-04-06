import { IPasienInfoRepository } from "@/application/repositories/pasieninfo.repositories.interface";
import { PasienInfoRecord } from "@/entities/models/pasien.models";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class PasienInfoRepository implements IPasienInfoRepository {
    async insertPasienInfo(pasienInfo: PasienInfoRecord, tx?: Prisma.TransactionClient): Promise<void> {
        const client = tx || prisma;
        await client.pasienInfo.create({
            data: pasienInfo,
        });
    }
    async findPasienByNoBPJSOrNIK(no_BPJS: string, nik: string): Promise<PasienInfoRecord | null> {
        const pasien = await prisma.pasienInfo.findFirst({
            where: {
                OR: [no_BPJS ? { no_BPJS: no_BPJS } : {}, { NIK: nik }],
            }
        });
        return pasien;
    }
}