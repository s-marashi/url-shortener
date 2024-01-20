export class Seed {
    constructor (
        private readonly id: number,
        private readonly seedId: number,
        private readonly form: string,
        private readonly to: string,
        private readonly issuedAt: Date,
        private readonly issuedTo: string,
    ) {}
}
