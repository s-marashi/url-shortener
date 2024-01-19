import { UrlResolved } from "../urlResolved/UrlResolved";

export class ResolveTrack {
    constructor(
        private short: string,
        private count: number,
        private lastVisitedAt: Date,
    ) { }

    updateWithUrlResolved(urlResolved: UrlResolved): void {
        this.count += 1;
        if (this.lastVisitedAt < urlResolved.timestamp) {
            this.lastVisitedAt = urlResolved.timestamp;
        }
    }

    static createFromUrlResolved(urlResolved: UrlResolved): ResolveTrack {
        return new ResolveTrack(
            urlResolved.short,
            1,
            urlResolved.timestamp,
        );
    }

    getShort(): string {
        return this.short;
    }

    getCount(): number {
        return this.count;
    }

    getLastVisitedAt(): Date {
        return this.lastVisitedAt;
    }
}
