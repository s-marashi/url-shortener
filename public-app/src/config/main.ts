export const config = {
    PUBLIC_APP_PORT: process.env.PUBLIC_APP_PORT,

    // mongo
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGODB_NAME: process.env.MONGODB_NAME,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,

    // redis
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,

    // rabbitmq
    RABBITMQ_USER: process.env.RABBITMQ_USER,
    RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST,
    RABBITMQ_PORT: process.env.RABBITMQ_PORT,
}
