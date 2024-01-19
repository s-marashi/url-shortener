export const config = {
    API_PORT: process.env.API_PORT || '4000',

    JWT_SECRET: process.env.JWT_SECRET || 'secret_token_to_be_changed',

    // mongo
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'url_shortener',
    
    // redis
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
}
