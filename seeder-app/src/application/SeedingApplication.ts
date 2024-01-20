import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { SeedRepository } from "../domain/seed/SeedRepository";
import { Seed } from "../domain/seed/Seed";
import { SeedCounterRepository } from "../domain/seedCounter/SeedCounterRepository";

@injectable()
export class SeedingApplication {
    private readonly SEED_MAX:number = 3521614;

    constructor(
        @inject(TYPES.SeedRepository)
        private readonly seedRepository: SeedRepository,
        @inject(TYPES.SeedCounterRepository)
        private readonly seedCounterRepository: SeedCounterRepository,
    ) { }

    async generateSeed(identity: string): Promise<Seed | null> {
        let seedId: number = await this.seedCounterRepository.getAndIncrease();
        if (seedId > this.SEED_MAX) {
            return null;
        }
        // return null;
        while (await this.seedRepository.doesExists(seedId)){
            seedId = await this.seedCounterRepository.getAndIncrease();
            console.log(seedId);
            if (seedId > this.SEED_MAX) {
                return null;
            }   
        }

        const seed: Seed = Seed.createFromSeedId(seedId, identity);
        await this.seedRepository.save(seed);
        
        return seed;
    }
}
