import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Application as ExpressApplication, json } from "express";
import { asyncContainer } from "./container";
import { Container } from "inversify";
import './controllers/ResolveController';
import cors from "cors";

(async () => {
  const container = new Container();
  await container.loadAsync(asyncContainer);

  const server = new InversifyExpressServer(container);
  server.setConfig((app: ExpressApplication)=>{
    app.use(cors());
    app.use(json());
  });

  // server.setErrorConfig((app: ExpressApplication) => {
  //   app.use(errorHandler);
  // });

  server.build().listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
})();
