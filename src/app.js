import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import "dotenv/config";

import makeCoordinateProvider from "./coordinate/coordinate.provider";
import makeCoordinateService from "./coordinate/coordinate.service";
import makeCoordinateController from "./coordinate/coordinate.controller";

const coordinateProvider = makeCoordinateProvider({ fetch });
const coordinateService = makeCoordinateService({ coordinateProvider });
const coordinateController = makeCoordinateController({ coordinateService });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/coordinate", coordinateController.get);

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = app;
