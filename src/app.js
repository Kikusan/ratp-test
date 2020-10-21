import express from "express";
import "dotenv/config";
const bodyParser = require('body-parser');
const fetch = require("node-fetch");


import makeCoordinateProvider from "./coordinate/coordinate.provider";
import makeCoordinateService from "./coordinate/coordinate.service";
import makeCoordinateController from "./coordinate/coordinate.controller";


const coordinateProvider = makeCoordinateProvider({ fetch });
const coordinateService = makeCoordinateService({ coordinateProvider });
const coordinateController = makeCoordinateController({ coordinateService });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/coordinate",coordinateController.get);
module.exports = app;