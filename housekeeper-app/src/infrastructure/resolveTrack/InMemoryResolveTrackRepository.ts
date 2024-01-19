import { ResolveTrack } from "../../domain/resolveTrack/ResolveTrack";
import { ResolveTrackRepository } from "../../domain/resolveTrack/ResolveTrackRepository";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class InMemoryResolveTrackRepository implements ResolveTrackRepository {
    private repository: Map<string, ResolveTrack> = new Map<string, ResolveTrack>()

    async findByShort(short: string): Promise<ResolveTrack | null> {
        return this.repository.get(short) ?? null;
    }

    async save(resolveTrack: ResolveTrack): Promise<number> {
        this.repository.set(resolveTrack.getShort(), resolveTrack);
        return this.repository.size;
    }

    async delete(resolveTrack: ResolveTrack): Promise<boolean> {
        return this.repository.delete(resolveTrack.getShort());
    }

    async getAllKeys(): Promise<string[]> {
        const keys: string[] = Array.from(this.repository.keys());
        return keys;
    }

    async clear(): Promise<void> {
        this.repository.clear();
    }
}
