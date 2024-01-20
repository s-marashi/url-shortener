import { SeedCounter } from "./SeedCounter";

export interface SeedRepository {
    getAndIncrease(): Promise<number>;
}
