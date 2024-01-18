export class Url {
    private static normalizerModule = null;  

    constructor(
        private guid: string,
        private short: string,
        private long: string,
        private lastVisitedAt: Date,
        private visitCount: number,
        private userGuid: string,
    ) { }

    getShort(): string {
        return this.short;
    }

    public static async normalize(long: string): Promise<string | null> {
        if (Url.normalizerModule === null) {
            try {
                Url.normalizerModule = await import("normalize-url");
            } catch(error) {
                return null;
            }
        }

        return Url.normalizerModule['default'](long);
    }
}
