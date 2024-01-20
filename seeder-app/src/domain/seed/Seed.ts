export class Seed {
    constructor (
        private readonly seedId: number,
        private readonly form: string,
        private readonly to: string,
        private readonly issuedAt: Date,
        private readonly issuedTo: string,
    ) {}

    static createFromSeedId(seedId: number, identity: string): Seed {
        return new Seed(
            seedId,
            this.convertToBase62(seedId*1000000),
            this.convertToBase62((seedId+1)*1000000),
            new Date(),
            identity
        );
    }

    static convertToBase62(number: number): string {
        const base = 62;
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
      
        if (number === 0) {
          return '0';
        }
      
        while (number > 0) {
          result = characters.charAt(number % base) + result;
          number = Math.floor(number / base);
        }
      
        return result.padStart(7, '0');
      }

    getSeedId() {
        return this.seedId;
    }

    getFrom() {
        return this.form;
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
