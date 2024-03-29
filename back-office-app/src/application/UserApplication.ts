import { inject, injectable } from "inversify";
import { User } from "../domain/user/User";
import { TYPES } from "../TYPES";
import { UserRepository } from "../domain/user/UserRepository";
import { Email } from "../domain/Email";

@injectable()
export class UserApplication {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    async signUp(email: string, password: string): Promise<boolean> {
        const exist : boolean = await this.userRepository.doesExists(new Email(email));
        if (exist) {
            return false;
        }
        try {
            const user: User = await User.register(new Email(email), password);
            this.userRepository.save(user);
            return true;
        } catch (error) {
            return false;
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const user: User | null = await this.userRepository.findOneByEmail(new Email(email));
        if (user === null) {
            return null;
        }

        const passwordMatch = await user.checkPassword(password);
        if (!passwordMatch) {
            return null;
        }

        return user;
    }
}
