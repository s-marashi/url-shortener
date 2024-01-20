export const config = {
    BACK_OFFICE_APP_PORT: process.env.BACK_OFFICE_APP_PORT || '4000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'url_shortener',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token_to_be_changed',
    SEEDER_URL: process.env.SEEDER_URL || 'http://seeder-app:5000/seed',
}
