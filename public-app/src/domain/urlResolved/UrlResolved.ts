import { Resolve } from "../resolve/Resolve";

export class UrlResolved {
    constructor(
        public readonly short: string,
        public readonly timestamp: Date,
    ) { }

    public static createFromResolve(resolve: Resolve): UrlResolved {
        return new UrlResolved(
            resolve.long,
            new Date(),
        );
    }
}
