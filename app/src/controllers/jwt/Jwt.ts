import { config } from "../../config/main";
import { Email } from "../../domain/Email";
import * as JWT from "jsonwebtoken";

export class Jwt {
    constructor(private email: Email) { }

    public static generate(email: Email, expiresInDay: number) {
        const token =  JWT.sign(
            { email: email.toString() },
            config.JWT_SECRET,
            { expiresIn: `${expiresInDay} days` }
        );

        return `Bearer ${token}`;
    }

    public static verify(phrase: String): Jwt | null {
        const token = phrase.replace('Bearer ', '');

        if (!token) {
            return null;
        }

        try {
            const payload = JWT.verify(token, config.JWT_SECRET);
            return new Jwt(new Email(payload['email']));
        } catch (error) {
            return null;
        }
    }

    getEmail() {
        return this.email;
    }
}
