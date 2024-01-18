import { Resolve } from "./Resolve";

export interface ResolveRepository {
    get(short: string): Promise<Resolve | null>;
    set(resolve: Resolve): Promise<void>;
}
