export interface SeedCounterRepository {
    getAndIncrease(): Promise<number>;
}
