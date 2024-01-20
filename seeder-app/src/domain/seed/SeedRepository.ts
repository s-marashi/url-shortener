import { Seed } from "./Seed";

export interface SeedRepository {
    doesExists(seedId: number): Promise<boolean>;
    save(seed: Seed): Promise<void>;
    
}
