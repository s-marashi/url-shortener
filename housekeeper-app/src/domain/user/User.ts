import { Email } from "../Email";
import { hash as passwordHash, compare as compareHash } from "bcrypt";

export class User {
    constructor(
        private email: Email,
        private password: string,
        private urls: string[],
        private id: string = ""
    ) { }

    private static readonly HASH_SALT_ROUND: number = 8;
    private static readonly LIMIT_URL_PER_USER: number = 10;

    public static async register(email: Email, password: string): Promise<User> {
        const hashedPassword = await passwordHash(password, this.HASH_SALT_ROUND);
        return new User(email, hashedPassword, []);
    }

    async checkPassword(password: string): Promise<boolean> {
        return await compareHash(password, this.password);
    }

    hasFreeCapacity(): boolean {
        return this.urls.length < User.LIMIT_URL_PER_USER;
    }

    addUrl(urlId: string) {
        this.urls.push(urlId);
    }

    dropUrl(urlId: string) {
        this.urls = this.urls.filter((id: string) => id !== urlId)
    }

    getId(): string {
        return this.id;
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
