# Url Shortner
We are assuming each shortened url contains 7 chars from a-zA-Z0-9.

By this assumption we have 62^7 urls which if in any second we use 10000 shorts it last around 11 years to use all of them.

We want to be as fast as possible and do not got slowed by url collision handling. In order to achive that a counter is assumed to give next possible url.

We also need to be scalable so we should be able to produce shorts in multiple instances simultanously. In order to achive scalability and zero collision at the same time a seeder service is developed where each instance when its given range is exhusted ask for a new range of shorts from seeder.

For url resolving in order to be fast a redis cache is considred with lru eviction policy and 2gb of memory which could easily fit about 7 milion url each of which of length 300 bytes.

As we need statistics in order to prevent slowing resolving process by gathering statistics, a service named house keeper is written which by using a rabbit queue gather usage reports in memory and once a while persist them to db.
In order to evict unused shorts from db, house keeper service runs a cron every 12 hours and delete old unused shorts.

To summerise the structure we have four apps:
1. back office:
    1. usesr register and login in it
    2. add and remove urls it generate shortfor every given long
    3. check statistics for their own urls

2. public app:
    1. users request it with a short and it redirect them to long
    2. it tries to load from cache and fallback to db
    2. send statistics to house keeper

3. house keeper
    1. gather usage data from public app and accumulate stats in memory and persist in db once a while
    2. runs a cron to evict unuded urls

4. seeder
    1. it produce and give unique seeds to back officeinorder to generate unique shorts