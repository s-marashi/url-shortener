import { TYPES } from "../TYPES";
import { inject, injectable } from "inversify";
import { ResolveTrackRepository } from "@domain/resolveTrack/ResolveTrackRepository";
import { ResolveTrack } from "../domain/resolveTrack/ResolveTrack";
import { UrlResolved } from "../domain/urlResolved/UrlResolved";
import { MessageQueueHandler } from "../domain/MessageQueueHandler";

@injectable()
export class ResolveTrackApplication implements MessageQueueHandler<UrlResolved> {
    constructor(
        @inject(TYPES.ResolveTrackRepository) private readonly resolveTrackRepository: ResolveTrackRepository,
    ) { }

    private async updateTrack(urlResolved: UrlResolved): Promise<void> {
        let resolveTrack: ResolveTrack | null = await this.resolveTrackRepository.findByShort(urlResolved.short);
        if (resolveTrack === null) {
            resolveTrack = ResolveTrack.createFromUrlResolved(urlResolved);
        } else {
            resolveTrack.updateWithUrlResolved(urlResolved);
        }
        
        if (resolveTrack.getCount() === 10000) {
            // persist it in mongo
            await this.resolveTrackRepository.delete(resolveTrack);
            return;
        }

        const repoSize: number = await this.resolveTrackRepository.save(resolveTrack);
        if (repoSize > 1000) {
            // persist them
            // clear repo
        }
    }

    async consume(message: UrlResolved): Promise<void> {
        console.log("Handle message");
    }    
}
