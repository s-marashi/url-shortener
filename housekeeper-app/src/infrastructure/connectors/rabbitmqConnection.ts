import client, { Connection, Channel, ConsumeMessage } from "amqplib";

export const createRabbitmqConnection = async (
    user: string,
    password: string,
    host: string,
    port: string,
): Promise<Channel> => {
    const connection: Connection = await client.connect(
        `amqp://${user}:${password}@${host}:${port}`
    );

    return await connection.createChannel();
};
