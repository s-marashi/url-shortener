import { asyncContainer } from "./container";
import { Container, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./TYPES";
import { CronScheduleHandler } from "./infrastructure/CronScheduleHandler";
import { UrlResolvedQueue } from "./domain/urlResolved/UrlResolvedQueue";

(async () => {
  const container = new Container();
  await container.loadAsync(asyncContainer);
  const results:any[] = await Promise.all([
    // Subscribe Promise
    new Promise(async (resolve, reject)=>{
      try {        
        const queue: UrlResolvedQueue = container.get<UrlResolvedQueue>(TYPES.UrlResolvedQueue);
        await queue.subscribe(container.get(TYPES.ResolveTrackApplication));
        resolve({name: "subscribe"});
      } catch(error) {
        reject(error.toString());
      }
    }),
    // Cron Promise
    new Promise((resolve, reject)=>{
      try {
        const cron: CronScheduleHandler = new CronScheduleHandler();
        cron.schedule("* */12 * * *", container.get(TYPES.UnusedUrlCleanupApplication));
        resolve({name: "cron"});
      } catch (error) {
        reject(error.toString());
      }
    }),
    // Http Promise
    new Promise((resolve, reject)=>{}),
  ]);

  console.log(results);
})();
