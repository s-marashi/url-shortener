export interface RequestHandler<RequestType> {
    consume(message: RequestType): Promise<void>
}
