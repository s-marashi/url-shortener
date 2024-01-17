export class Url {
    constructor(
        private guid: string,
        private short: string,
        private long: string,
        private lastVisitedAt: Date,
        private visitCount: number,
        private userGuid: string,
    ) {}
}
