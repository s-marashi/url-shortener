export const config = {
    BACK_OFFICE_APP_PORT: process.env.BACK_OFFICE_APP_PORT,

    // mongo
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGODB_NAME: process.env.MONGODB_NAME,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,

    // jwt
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token_to_be_changed',
    
    // seeder
    SEEDER_URL: process.env.SEEDER_URL,
}
