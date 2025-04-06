import EmailVerifyBDC from "@/app/components/email/email-verify";
import { IPasienInfoRepository } from "@/application/repositories/pasieninfo.repositories.interface";
import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IEmailService } from "@/application/services/email.service.interface";
import { IPasswordService } from "@/application/services/password.service.interface";
import { IVerificationService } from "@/application/services/verification.service.interface";
import { RegistrationError } from "@/entities/errors/common";
import { PasienInfoCreateInput, PasienInfoRecord } from "@/entities/models/pasien.models";
import { UserCreateInput, UserRecord } from "@/entities/models/user.models";
import { TransactionService } from "@/infrastructure/services/transaction.service";
import { v4 as uuidv4 } from "uuid";

export class RegisterUserCase {
    constructor(
        private userRepository: IUserRepository,
        private pasienInfoRepository: IPasienInfoRepository,
        private verificationService: IVerificationService,
        private transactionService: TransactionService,
        private passwordService: IPasswordService,
        private emailService: IEmailService
    ) {}

    async execute(userData: UserCreateInput, pasienInfo: PasienInfoCreateInput) {
        const existingUser = await this.userRepository.findUserByEmailOrPhone(userData.email, userData.no_telp);

        if (existingUser) {
            if (existingUser.email === userData.email) {
                throw new RegistrationError("Email user already used!");
            }
            if (existingUser.no_telp === userData.no_telp) {
                throw new RegistrationError("Phone number already used!");
            }
            throw new RegistrationError("Email user And Phone Number already used!");
        }

        const existingPasien = await this.pasienInfoRepository.findPasienByNoBPJSOrNIK(pasienInfo.no_BPJS, pasienInfo.NIK);

        if (existingPasien) {
            if (pasienInfo.no_BPJS && existingPasien.no_BPJS === pasienInfo.no_BPJS) {
                throw new RegistrationError("No BPJS already used!");
            }
            if (existingPasien.NIK === pasienInfo.NIK) {
                throw new RegistrationError("NIK already used!");
            }
            throw new RegistrationError("No BPJS and NIK already used!");
        }

        const userId = uuidv4();
        const pasienId = uuidv4();
        const hashPassword = this.passwordService.hashPassword(
            userData.password
        );

        const { confirm_password, ...userDataWithoutConfirm } = userData;
        const insertUser: UserRecord = {
            ...userDataWithoutConfirm,
            UserID: userId,
            password: hashPassword,
        };

        const insertPasienInfo: PasienInfoRecord = {
            ...pasienInfo,
            id: pasienId,
            userId: userId,
        };

        await this.transactionService.startTransaction(async (tx) => {
            await this.userRepository.insertUser(insertUser, tx);
            await this.pasienInfoRepository.insertPasienInfo(insertPasienInfo, tx);
        });

        const token = this.verificationService.generateTokenVerification();
        const subjectEmail = "Verifikasi Email - Bungah Dental Care";

        await this.verificationService.createTokenEmailVerification(token, userId);
        await this.emailService.sendEmail(
            EmailVerifyBDC({ token }),
            subjectEmail,
            userData.email
        );
    }
}