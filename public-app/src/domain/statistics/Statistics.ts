import { Resolve } from "../../domain/resolve/Resolve";

export class Statistics {
    constructor(
        public readonly short: string,
        public readonly timestamp: Date,
    ) { }

    public static createFromResolve(resolve: Resolve): Statistics {
        return new Statistics(
            resolve.long,
            new Date(),
        );
    }
}
