import { Email } from "../Email";
import { User } from "../../domain/user/User";

export interface UserRepository {
    doesExists(email: Email): Promise<boolean>;
    save(user: User): Promise<void>;
    findOneByEmail(email: Email): Promise<User | null>;
}
