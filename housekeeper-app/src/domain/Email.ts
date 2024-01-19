export class Email {
    private normalized: string;
    private display: string;

    constructor(email: string) {
        this.display = email;
        this.normalized = this.normalize(email);
    }

    private PLUS_ONLY = /\+.*$/;
    private PLUS_AND_DOT = /\.|\+.*$/g;

    private providers = {
        'gmail.com': {
            'cut': this.PLUS_AND_DOT
        },
        'googlemail.com': {
            'cut': this.PLUS_AND_DOT,
            'aliasOf': 'gmail.com'
        },
        'hotmail.com': {
            'cut': this.PLUS_ONLY
        },
        'live.com': {
            'cut': this.PLUS_AND_DOT
        },
        'outlook.com': {
            'cut': this.PLUS_ONLY
        }
    }

    private normalize(email: string): string | null {
        const normalizedEmail = email.toLowerCase();
        const parts = normalizedEmail.split(/@/);

        if (parts.length !== 2) {
            return email;
        }
        let [username, domain] = parts;

        if (this.providers.hasOwnProperty(domain)) {
            if (this.providers[domain].hasOwnProperty('cut')) {
                username = username.replace(this.providers[domain].cut, '');
            }
            if (this.providers[domain].hasOwnProperty('aliasOf')) {
                domain = this.providers[domain].aliasOf;
            }
        }

        return username + '@' + domain;
    }

    getNormalized() {
        return this.normalized;
    }

    getDisplay() {
        return this.display;
    }
}
