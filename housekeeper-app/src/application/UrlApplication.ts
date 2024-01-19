import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { Url } from "../domain/url/Url";
import { UrlRepository } from "../domain/url/UrlRepository";
import { ResolveTrack } from "../domain/resolveTrack/ResolveTrack";

@injectable()
export class UrlApplication {
    constructor(
        @inject(TYPES.UrlRepository)
        private readonly urlRepository: UrlRepository,
    ) { }

    async updateUrlWithResolveTrack(resolveTrack: ResolveTrack): Promise<void> {
        let url: Url | null = await this.urlRepository.findOneByShort(resolveTrack.getShort());
        if (url === null) {
            return;
        }

        url.updateWithResolveTrack(resolveTrack);
        this.urlRepository.save(url);
    }
}
