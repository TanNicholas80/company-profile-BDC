import { RegisterUserCase } from "@/application/use-cases/auth/user/register.use-case";
import { InputParsedError } from "@/entities/errors/common";
import { PasienInfoCreateInput } from "@/entities/models/pasien.models";
import { UserCreateInput } from "@/entities/models/user.models";
import { PasienInfoRepository } from "@/infrastructure/repositories/pasieninfo.repositories";
import { UserRepository } from "@/infrastructure/repositories/user.repositories";
import { VerifiedRepository } from "@/infrastructure/repositories/verified.repository";
import { PasswordService } from "@/infrastructure/services/password.service";
import { ResendEmailService } from "@/infrastructure/services/resend-email.service";
import { TokenVerificationService } from "@/infrastructure/services/token-verification.service";
import { TransactionService } from "@/infrastructure/services/transaction.service";
import { Goldar, JK, Role } from "@prisma/client";
import { z } from "zod";

const userRepository = new UserRepository();
const pasienInfoRepository = new PasienInfoRepository();
const verifiedRepository = new VerifiedRepository();

const verificationService = new TokenVerificationService(verifiedRepository);
const transactionService = new TransactionService();
const passwordService = new PasswordService();
const emailService = new ResendEmailService();

const registerUserUseCase = new RegisterUserCase(
  userRepository,
  pasienInfoRepository,
  verificationService,
  transactionService,
  passwordService,
  emailService
);

export const userRegisterValidation = z
  .object({
    nama: z.string().min(3).max(31),
    email: z.string().email(),
    password: z.string().min(8).max(31),
    confirm_password: z.string().min(8).max(31),
    no_telp: z.string(),
    alamat: z.string().min(8).max(100),
    Foto: z.string().nullable(),
    role: z.nativeEnum(Role).default(Role.ADMIN),
    is_verified: z.boolean().default(false),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export const pasienInfoValidation = z.object({
    NIK: z.string().max(16),
    no_BPJS: z.string().max(13).nullable(),
    jenis_kelamin: z.nativeEnum(JK),
    golongan_darah: z.nativeEnum(Goldar).default(Goldar.Tidak_Tahu),
    tgl_lahir: z.date(),
    alergi: z.string().nullable(),
});

export const registerUserController = async (
    userData: UserCreateInput,
    pasienInfo: PasienInfoCreateInput
) => {
    const parsedUserData = userRegisterValidation.safeParse(userData);
    const parsedPasienInfo = pasienInfoValidation.safeParse(pasienInfo);

    if (!parsedUserData.success || !parsedPasienInfo.success) {
        const errorField = {
            ...parsedUserData.error?.flatten().fieldErrors,
            ...parsedPasienInfo.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid data", errorField);
    }

    return await registerUserUseCase.execute(userData, pasienInfo)
}