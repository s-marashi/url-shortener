import { inject, injectable } from "inversify";
import { User } from "../domain/user/User";
import { TYPES } from "../TYPES";
import { UserRepository } from "../domain/user/UserRepository";
import { Email } from "../domain/Email";
import * as JWT from "jsonwebtoken";
import { config } from "../config/main";
import { Jwt } from "../controllers/jwt/Jwt";

@injectable()
export class UserApplication {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    async signUp(email: string, password: string): Promise<void> {
        const user: User = await User.register(new Email(email), password);
        this.userRepository.save(user);
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const user: User | null = await this.userRepository.findOneByEmail(new Email(email));
        if (user === null) {
            return null;
        }

        console.log(user.getId());

        const passwordMatch = await user.checkPassword(password);
        if (!passwordMatch) {
            return null;
        }

        return user;
    }
}
