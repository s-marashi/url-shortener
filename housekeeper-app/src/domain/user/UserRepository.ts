import { Email } from "../Email";
import { User } from "./User";

export interface UserRepository {
    doesExists(email: Email): Promise<boolean>;
    save(user: User): Promise<void>;
    findOneByEmail(email: Email): Promise<User | null>;
    findOneById(id: string): Promise<User | null>;
}
