export const config = {
    API_PORT: process.env.API_PORT || '4000',

    // mongo
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_NAME: process.env.MONGODB_NAME || 'url_shortener',

    // rabbitmq
    RABBITMQ_USER: process.env.RABBITMQ_USER,
    RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST,
    RABBITMQ_PORT: process.env.RABBITMQ_PORT,
}
