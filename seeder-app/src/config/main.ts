export const config = {
    SEEDER_APP_PORT: process.env.SEEDER_APP_PORT || '6000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'url_shortener',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token_to_be_changed',
}
