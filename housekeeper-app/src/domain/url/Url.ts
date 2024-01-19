import { ResolveTrack } from "../resolveTrack/ResolveTrack";

export class Url {
    private static normalizerModule = null;

    constructor(
        private short: string,
        private long: string,
        private lastVisitedAt: Date,
        private visitCount: number,
        private userId: string,
        private id: string = ""
    ) { }

    getShort(): string {
        return this.short;
    }

    getLong(): string {
        return this.long;
    }

    getLastVisitedAt(): Date {
        return this.lastVisitedAt;
    }

    getVisitCount(): number {
        return this.visitCount;
    }

    getUserId(): string {
        return this.userId;
    }

    getId(): string {
        return this.id;
    }

    updateWithResolveTrack(resolveTrack: ResolveTrack): void {
        this.visitCount = resolveTrack.getCount() + this.visitCount;
        if (this.lastVisitedAt < resolveTrack.getLastVisitedAt()) {
            this.lastVisitedAt = resolveTrack.getLastVisitedAt();
        }
    }
}
