import { inject, injectable } from "inversify";
import { Seed } from "../../domain/seed/Seed";
import { SeedRepository } from "../../domain/seed/SeedRepository";
import { TYPES } from "../../TYPES";
import { DataSource, Repository } from "typeorm";
import { SeedEntity } from "./SeedEntity";

@injectable()
export class SqliteSeedRepository implements SeedRepository {
    private readonly seedRepository: Repository<SeedEntity>;

    constructor(
        @inject(TYPES.Db) private readonly dataSource: DataSource,
    ) {
        this.seedRepository = this.dataSource.getRepository(SeedEntity);
    }

    async doesExists(seedId: number): Promise<boolean> {
        const seed: SeedEntity | null = await this.seedRepository.findOneBy({seedId});
        return !! seed;
    }

    async save(seed: Seed): Promise<void> {
        const seedEntity: SeedEntity = new SeedEntity();
        seedEntity.seedId = seed.getSeedId();
        seedEntity.from = seed.getFrom();
        seedEntity.to = seed.getTo();
        seedEntity.issuedAt = seed.getIssuedAt();
        seedEntity.issuedTo = seed.getIssuedTo();

        await this.seedRepository.save(seedEntity);
    }
}
