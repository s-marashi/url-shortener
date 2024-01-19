import { Resolve } from "../resolve/Resolve";

export class UrlResolved {
    constructor(
        public readonly short: string,
        public readonly timestamp: Date,
    ) { }
}
