export const TYPES = {
    RequestValidator: Symbol('RequestValidator'),

    Db: Symbol('Db'),
    Cache: Symbol('Cache'),
    MessageQueue: Symbol('MessageQueue'),

    ResolveController: Symbol('ResolveController'),
    ResolveApplication: Symbol('ResolveApplication'),
    ResolveCache: Symbol('ResolveCache'),
    ResolveDb: Symbol('ResolveDb'),
    MongoResolveDataMapper: Symbol('DbResolveDataMapper'),
    RedisResolveDataMapper: Symbol('RedisResolveDataMapper'),

    StatisticsApplication: Symbol('StatisticsApplication'),
}
