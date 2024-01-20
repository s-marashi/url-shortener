import { asyncContainer } from "./container";
import { Container, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./TYPES";
import { CronScheduleHandler } from "./infrastructure/CronScheduleHandler";
import { UrlResolvedQueue } from "./domain/urlResolved/UrlResolvedQueue";
import { InversifyExpressServer } from "inversify-express-utils";
import { Express as ExpressApplication, json } from 'express';
import cors from 'cors';
import './controllers/HealthCheckController';
import { config } from "./config/main";

(async () => {
  const container = new Container();
  await container.loadAsync(asyncContainer);


  // API Server initialisation
  const server = new InversifyExpressServer(container);
  server.setConfig((app: ExpressApplication) => {
    app.use(cors());
    app.use(json());
  });

  server.build().listen(config.HOUSEKEEPER_APP_PORT, () => {
    console.log(`Server started on :${config.HOUSEKEEPER_APP_PORT}`);
  });

  const queue: UrlResolvedQueue = container.get<UrlResolvedQueue>(TYPES.UrlResolvedQueue);
  await queue.subscribe(container.get(TYPES.ResolveTrackApplication));

  const cron: CronScheduleHandler = new CronScheduleHandler();
  cron.schedule("* */12 * * *", container.get(TYPES.UnusedUrlCleanupApplication));
})();
