import { TYPES } from "../TYPES";
import { inject, injectable } from "inversify";
import { ResolveTrackRepository } from "../domain/resolveTrack/ResolveTrackRepository";
import { ResolveTrack } from "../domain/resolveTrack/ResolveTrack";
import { UrlResolved } from "../domain/urlResolved/UrlResolved";
import { MessageQueueHandler } from "../domain/MessageQueueHandler";
import { UrlApplication } from "./UrlApplication";

@injectable()
export class ResolveTrackApplication implements MessageQueueHandler<UrlResolved> {
    constructor(
        @inject(TYPES.ResolveTrackRepository) private readonly resolveTrackRepository: ResolveTrackRepository,
        @inject(TYPES.UrlApplication) private readonly urlApplication: UrlApplication,
    ) { }

    private async updateTrack(urlResolved: UrlResolved): Promise<void> {
        let resolveTrack: ResolveTrack | null = await this.resolveTrackRepository.findByShort(urlResolved.short);
        if (resolveTrack === null) {
            resolveTrack = ResolveTrack.createFromUrlResolved(urlResolved);
        } else {
            resolveTrack.updateWithUrlResolved(urlResolved);
        }

        if (resolveTrack.getCount() === 10000) {
            await this.urlApplication.updateUrlWithResolveTrack(resolveTrack);
            await this.resolveTrackRepository.delete(resolveTrack);
            return;
        }

        const repoSize: number = await this.resolveTrackRepository.save(resolveTrack);
        if (repoSize > 1000) {
            const shorts: string[] = await this.resolveTrackRepository.getAllKeys();
            for (const short of shorts) {
                const resolveTrack: ResolveTrack = await this.resolveTrackRepository.findByShort(short);
                await this.urlApplication.updateUrlWithResolveTrack(resolveTrack);
                await this.resolveTrackRepository.delete(resolveTrack);
            }
        }
    }

    async consume(urlResolved: UrlResolved): Promise<void> {
        await this.updateTrack(urlResolved);
    }
}
