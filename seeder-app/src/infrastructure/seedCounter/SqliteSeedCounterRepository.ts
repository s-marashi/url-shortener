import { TYPES } from "../../TYPES";
import { SeedCounterRepository } from "../../domain/seedCounter/SeedCounterRepository";
import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";
import { SeedCounterEntity } from "./SeedCounterEntity";

@injectable()
export class SqliteSeedCounterRepository implements SeedCounterRepository {
    private readonly seedCounterRepository: Repository<SeedCounterEntity>;

    constructor(
        @inject(TYPES.Db) private readonly dataSource: DataSource,
    ) {
        this.seedCounterRepository = this.dataSource.getRepository(SeedCounterEntity);
    }

    async getAndIncrease(): Promise<number> {
        let counter: SeedCounterEntity | null = await this.seedCounterRepository.findOneBy({ id: 1 });
        if (counter === null) {
            counter = new SeedCounterEntity()
            counter.issuedSeedIdCounter = 0;
        }
        counter.issuedSeedIdCounter += 1;
        await this.seedCounterRepository.save(counter);

        return counter.issuedSeedIdCounter - 1;
    };
}
