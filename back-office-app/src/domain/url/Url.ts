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

    public static async normalize(long: string): Promise<string | null> {
        if (Url.normalizerModule === null) {
            try {
                Url.normalizerModule = await import("normalize-url");
            } catch (error) {
                return null;
            }
        }

        return Url.normalizerModule['default'](long);
    }

    public static async shortenIt(short: string, long: string, userId: string): Promise<Url | null> {
        const normalizedLong = await Url.normalize(long);
        if (normalizedLong === null) {
            return null;
        }

        return new Url(short, normalizedLong, new Date(), 0, userId);
    }
}
