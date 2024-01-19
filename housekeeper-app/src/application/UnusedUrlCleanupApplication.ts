import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { Url } from "../domain/url/Url";
import { UrlRepository } from "../domain/url/UrlRepository";
import { RequestHandler } from "../domain/RequestHandler";
import { User } from "../domain/user/User";
import { UserRepository } from "../domain/user/UserRepository";

@injectable()
export class UnusedUrlCleanupApplication implements RequestHandler<Date>{
    constructor(
        @inject(TYPES.UrlRepository) private readonly urlRepository: UrlRepository,
        @inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
    ) { }

    async consume(now: Date): Promise<void> {
        const dateThreshold: Date = new Date(now.getTime());
        dateThreshold.setFullYear(now.getFullYear() - 1);
        const urlPerQuery: number = 100;

        while (true) {
            const urls: Url[] = await this.urlRepository.findUrlsNotvisitedAfter(dateThreshold, urlPerQuery);
            if (urls.length === 0) {
                break;
            }

            for (const url of urls) {
                const user: User | null = await this.userRepository.findOneById(url.getUserId());
                if (user === null) {
                    continue;
                }

                user.dropUrl(url.getId());
                await this.userRepository.save(user);
                await this.urlRepository.dropOneById(url.getId());
            }
        }
    }
}
