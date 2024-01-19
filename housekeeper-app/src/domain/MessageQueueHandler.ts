export interface MessageQueueHandler<Messagetype> {
    consume(message: Messagetype): Promise<void>
}
