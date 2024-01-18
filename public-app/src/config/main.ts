export const config = {
    API_PORT: process.env.API_PORT || '4000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'url_shortener',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token_to_be_changed',
}
