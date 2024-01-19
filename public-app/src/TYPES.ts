export const TYPES = {
    RequestValidator: Symbol('RequestValidator'),

    Db: Symbol('Db'),
    Cache: Symbol('Cache'),
    MessageQueue: Symbol('MessageQueue'),

    ResolveController: Symbol('ResolveController'),
    ResolveApplication: Symbol('ResolveApplication'),
    ResolveCache: Symbol('ResolveCache'),
    ResolveRepository: Symbol('ResolveRepository'),
    MongoResolveDataMapper: Symbol('DbResolveDataMapper'),
    RedisResolveDataMapper: Symbol('RedisResolveDataMapper'),

    StatisticsApplication: Symbol('StatisticsApplication'),
    StatisticsQueue: Symbol('StatisticsQueue'),
    StatisticsDataMapper: Symbol('StatisticsDataMapper'),
}
