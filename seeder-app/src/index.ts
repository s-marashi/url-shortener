import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Application as ExpressApplication, json } from "express";
import { asyncContainer } from "./container";
import { Container } from "inversify";
import './controllers/SeedController';
import cors from "cors";
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

  server.build().listen(config.SEEDER_APP_PORT, () => {
    console.log(`Server started on :${config.SEEDER_APP_PORT}`);
  });
})();
