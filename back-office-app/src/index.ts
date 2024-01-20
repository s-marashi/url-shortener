import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Application as ExpressApplication, json } from "express";
import { asyncContainer } from "./container";
import { Container } from "inversify";
import './controllers/UserController';
import './controllers/UrlController';
import './controllers/HealthCheckController';
import cors from "cors";
import { config } from "./config/main";

(async () => {
  const container = new Container();
  await container.loadAsync(asyncContainer);

  // API Server initialisation
  const server = new InversifyExpressServer(container);
  server.setConfig((app: ExpressApplication)=>{
    app.use(cors());
    app.use(json());
  });

  server.build().listen(config.BACK_OFFICE_APP_PORT, () => {
    console.log(`Server started on :${config.BACK_OFFICE_APP_PORT}`);
  });
})();
