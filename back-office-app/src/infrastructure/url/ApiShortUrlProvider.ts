import { ShortUrlProvider } from "../../domain/url/ShortUrlProvider";
import { inject, injectable } from "inversify";
import axios, { AxiosResponse } from "axios";
import { TYPES } from "../../TYPES";

@injectable()
export class ApiShortUrlProvider implements ShortUrlProvider {
    private min: string | null = null;
    private max: string | null = null;
    private counter: string | null = null;

    private maxLength: number = 7;
    private readonly N1 = '0000001';
    private readonly N10000 = '00001C8';
    private readonly N1000000 = '0004c92';

    constructor(
        @inject(TYPES.ShortUrlProviderAPI) private readonly shortUrlProviderApi: string
    ) { }

    async getShortUrl(): Promise<string | null> {
        try {
            if (this.min === null) {
                await this.getRange();
            }

            if (this.counter === null) {
                this.counter = this.min;
            }

            if (this.counter === this.max) {
                await this.getRange();
                this.counter = this.min;
            }

            this.counter = this.base62Addition(this.counter, this.N1);
            return this.counter;
        } catch (error) {
            return null;
        }
    }

    private async getRange(): Promise<void> {
        try {
            const response: AxiosResponse = await axios.post(
                this.shortUrlProviderApi,
                { identity: "" },
            );

            if (response.status !== 200) {
                throw new Error("Failed to get range");
            }

            this.min = response.data.from;
            this.max = response.data.to;

            return;
        } catch (error) {
            throw new Error(error);
        }
    }

    private fallbackGetRange(): void {
        if (this.min === null) {
            this.min = this.N10000;
            this.max = this.N1000000;
        } else {
            this.min = this.base62Addition(this.max, this.N1);
            this.max = this.base62Addition(this.max, this.N1000000);
        }
    }

    private base62Addition(num1: string, num2: string): string {
        const base62Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const base = base62Chars.length;

        let carry = 0;
        let result = '';

        // Pad the numbers with leading zeros to make them of equal length
        num1 = num1.padStart(this.maxLength, '0');
        num2 = num2.padStart(this.maxLength, '0');

        for (let i = this.maxLength - 1; i >= 0; i--) {
            const index1 = base62Chars.indexOf(num1[i]);
            const index2 = base62Chars.indexOf(num2[i]);

            let sum = index1 + index2 + carry;
            carry = Math.floor(sum / base);
            sum %= base;

            result = base62Chars[sum] + result;
        }

        if (carry > 0) {
            result = base62Chars[carry] + result;
        }

        return result;
    }
}
