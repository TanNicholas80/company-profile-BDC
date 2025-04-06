import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";
import { IPasswordService } from "@/application/services/password.service.interface";

export class PasswordService implements IPasswordService {
    comparePassword(plainPassword: string, hashedPassword: string): Boolean {
        return compareSync(plainPassword, hashedPassword);
    }

    hashPassword(plainPassword: string): string {
        const salt = genSaltSync(10);
        const hash = hashSync(plainPassword, salt);
        return hash;
    }
}