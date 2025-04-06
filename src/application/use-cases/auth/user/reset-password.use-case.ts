import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IPasswordService } from "@/application/services/password.service.interface";
import { VerificationError } from "@/entities/errors/common";

export class ResetPasswordUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService,
    ) {}
    async execute(email: string, password: string, confirmPassword: string): Promise<boolean> {
        const findUserByEmail = await this.userRepository.findUserByEmail(email);
        if (!findUserByEmail) {
            throw new VerificationError("Sorry, email not found");
            return false;
        }
        if (password !== confirmPassword) {
            throw new VerificationError("Password and confirm password not match");
            return false;
        }
        const hashPassword = this.passwordService.hashPassword(password);
        await this.userRepository.updatePassword(findUserByEmail.UserID, hashPassword);
        return true;
    }
}
