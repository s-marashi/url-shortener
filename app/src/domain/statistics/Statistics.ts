export class Statistics {
    constructor(
        public readonly url: string,
        public readonly short: string,
        public readonly lastVisitedAt: Date,
        public readonly visitCount: number,
    ) { }
}
