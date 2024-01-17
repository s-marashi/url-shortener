import { v4 as UUID } from 'uuid';
import { Email } from '@domain/Email';
import { hash as passwordHash, compare as compareHash } from "bcrypt";

export class User {
    constructor(
        private guid: string,
        private email: Email,
        private password: string,
        private urls: string[]
    ) { }

    private static readonly HASH_SALT_ROUND: number = 8;

    public static async register(email: Email, password: string): Promise<User> {
        const hashedPassword = await passwordHash(password, this.HASH_SALT_ROUND);
        return new User(UUID(), email, hashedPassword, []);
    }

    async checkPassword(password: string): Promise<boolean> {
        return await compareHash(password, this.password);
    }

    getGuid(): string {
        return this.guid;
    }

    getEmail(): Email {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getUrls(): string[] {
        return this.urls;
    }
}
