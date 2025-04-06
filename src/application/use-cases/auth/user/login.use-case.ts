import { IUserRepository } from "@/application/repositories/user.repositories.interface";
import { IAuthenticationService } from "@/application/services/authentication.service.interface";
import { IPasswordService } from "@/application/services/password.service.interface";
import { AuthenticationError } from "@/entities/errors/common";

export class LoginUserCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService,
        private authenticationService: IAuthenticationService,
    ) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new AuthenticationError("Email atau password salah");
        }

        const isPasswordValid = this.passwordService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError("Email atau password salah");
        }

        const sessionToken = this.authenticationService.generateSessionToken();
        await this.authenticationService.createSession(sessionToken, user.UserID);
        
        return sessionToken;
    }
}
