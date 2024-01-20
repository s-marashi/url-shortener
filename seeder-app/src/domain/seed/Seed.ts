export class Seed {
    private static readonly CHAR_COUNT = 7;
    private static readonly CHUNK_LENGTH = 1000000;
    private static readonly SEED_MAX:number = Math.floor(Math.pow(62, this.CHAR_COUNT)/this.CHUNK_LENGTH);

    private static readonly CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    private static readonly BASE = this.CHARS.length;

    constructor (
        private readonly seedId: number,
        private readonly from: string,
        private readonly to: string,
        private readonly issuedAt: Date,
        private readonly issuedTo: string,
    ) {}

    static createFromSeedId(seedId: number, identity: string): Seed {
        if (seedId > this.SEED_MAX) {
            return null;
        }

        return new Seed(
            seedId,
            this.convertToBase62(seedId*1000000),
            this.convertToBase62((seedId+1)*1000000),
            new Date(),
            identity
        );
    }

    static convertToBase62(number: number): string {
        let result = '';
      
        if (number === 0) {
          return Seed.CHARS[0].repeat(Seed.CHAR_COUNT);
        }
      
        while (number > 0) {
          result = Seed.CHARS.charAt(number % Seed.BASE) + result;
          number = Math.floor(number / Seed.BASE);
        }
      
        return result.padStart(Seed.CHAR_COUNT, Seed.CHARS[0]);
      }

    getSeedId() {
        return this.seedId;
    }

    getFrom() {
        return this.from;
    }

    getTo() {
        return this.to;
    }

    getIssuedAt() {
        return this.issuedAt;
    }

    getIssuedTo() {
        return this.issuedTo;
    }
}
