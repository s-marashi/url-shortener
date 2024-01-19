import { ResolveTrack } from "./ResolveTrack";

export interface ResolveTrackRepository {
    findByShort(short: string): Promise<ResolveTrack>;
    save(ResolveTrack: ResolveTrack): Promise<number>;
    delete(ResolveTrack: ResolveTrack): Promise<boolean>;
    getAllKeys(): Promise<string[]>;
    clear(): Promise<void>;
}
