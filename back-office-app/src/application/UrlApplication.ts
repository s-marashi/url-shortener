import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { Email } from "../domain/Email";
import { Url } from "../domain/url/Url";
import { User } from "../domain/user/User";
import { UserRepository } from "../domain/user/UserRepository";
import { UrlRepository } from "../domain/url/UrlRepository";
import { ShortUrlProvider } from "../domain/url/ShortUrlProvider";
import { Statistics } from "../domain/statistics/Statistics";

@injectable()
export class UrlApplication {
    constructor(
        @inject(TYPES.UrlRepository)
        private readonly urlRepository: UrlRepository,
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
        @inject(TYPES.ShortUrlProvider)
        private readonly shortUrlProvider: ShortUrlProvider
    ) { }

    async add(long: string, email: Email): Promise<Url | null> {
        const user: User | null = await this.userRepository.findOneByEmail(email);
        if (user === null) {
            return null;
        }
        if (!user.hasFreeCapacity()) {
            return null;
        }

        const normalizedLong = await Url.normalize(long);
        if (normalizedLong === null) {
            return null;
        }
        const exist = await this.urlRepository.doesExists(normalizedLong, user.getId());
        if (exist) {
            return null;
        }

        const short = await this.shortUrlProvider.getShortUrl();
        if (short === null) {
            return null;
        }

        let url = await Url.shortenIt(short, long, user.getId());
        url = await this.urlRepository.save(url);
        if (url === null) {
            return null;
        }

        user.addUrl(url.getId());
        this.userRepository.save(user);

        return url;
    }

    async drop(long: string, email: Email): Promise<boolean> {
        const user: User | null = await this.userRepository.findOneByEmail(email);
        if (user === null) {
            return null;
        }

        const normalizedLong = await Url.normalize(long);
        if (normalizedLong === null) {
            return null;
        }
        const url = await this.urlRepository.findOneByLongAndUserId(normalizedLong, user.getId());
        if (url === null) {
            return false;
        }

        user.dropUrl(url.getId())

        await this.urlRepository.dropOneById(url.getId());
        await this.userRepository.save(user);

        return true;
    }

    async getStatisticsByEmail(email: Email): Promise<Statistics[]> {
        const user: User | null = await this.userRepository.findOneByEmail(email);
        if (user === null) {
            return null;
        }

        return await this.urlRepository.getStatisticsByUserId(user.getId());
    }
}
