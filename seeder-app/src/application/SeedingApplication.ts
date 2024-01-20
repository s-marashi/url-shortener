import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { UserRepository } from "../domain/user/UserRepository";

@injectable()
export class UrlApplication {
    constructor(
        @inject(TYPES.UrlRepository)
        private readonly urlRepository: UrlRepository,
    ) { }

    async generateSeed(): Promise<Seed | null> {
        
    }
}
