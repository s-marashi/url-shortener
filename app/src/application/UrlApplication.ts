import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { Email } from "../domain/Email";
import { Url } from "../domain/url/Url";
import { User } from "../domain/user/User";
import { UserRepository } from "../domain/user/UserRepository";
import { UrlRepository } from "../domain/url/UrlRepository";

@injectable()
export class UrlApplication {
    constructor(
        @inject(TYPES.UrlRepository)
        private readonly urlRepository: UrlRepository,
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    async add(long: string, email: Email): Promise<Url | null> {
        console.log('add is working');
        return null;
        // const exist = await this.urlRepository.doesExist(Url.normalize(long), email);
        // if (exist) {
        //     return null;
        // }

        // const user: User | null = await this.userRepository.findOneByEmail(email);
        // if (user === null) {
        //     return null;
        // }
        // if (! user.hasFreeCapacity()) {
        //     return null;
        // }

        // const url = Url.shortenIt(long, user.getGuid());
        // user.addUrl(url.getGuid());

        // this.userRepository.save(user);
        // this.urlRepository.save(url);

        // return url;
    }
}
