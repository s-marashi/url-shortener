import { RedisClientType, createClient } from "redis";

export const createRedisConnection = async (host: string, port: number, password: string): Promise<any> => {
    const client = createClient({url: `redis://redis:${port}`, password});
    client.on("error", (err) => console.log(`redis: ${err}`));
    client.on("connect", () => console.log(`redis: connected`));

    return await client.connect();
}
