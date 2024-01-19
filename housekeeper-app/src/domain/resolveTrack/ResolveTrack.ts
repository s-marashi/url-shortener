import { UrlResolved } from "../urlResolved/UrlResolved";

export class ResolveTrack {
    constructor(
        private short: string,
        private count: number,
        private lastVisitedAt: Date,
    ) { }

    updateWithUrlResolved(urlResolved: UrlResolved) {
        this.count += 1;
        this.lastVisitedAt = urlResolved.timestamp;
    }

    static createFromUrlResolved(urlResolved: UrlResolved): ResolveTrack {
        return new ResolveTrack(
            urlResolved.short,
            1,
            urlResolved.timestamp,
        );
    }

    getShort() {
        return this.short;
    }

    getCount() {
        return this.count;
    }
}
