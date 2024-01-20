export class Resolve {
    private static readonly SHORT_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    private static readonly SHORT_LENGTH = 7;

    constructor(
        public readonly short: string,
        public readonly long: string,
    ) { }

    public static validateShort(short: string): boolean {

        if (short.length !== Resolve.SHORT_LENGTH) {
            return false;
        }

        for (const ch of short.split('')) {
            if (Resolve.SHORT_CHARS.indexOf(ch) === -1) {
                return false;
            }
        }

        return true;
    }
}
