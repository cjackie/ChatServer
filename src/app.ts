import express from "express";
import bodyParser from "body-parser";
import logger from "./util/logger";
import { NextFunction, Request, Response } from "express";
import ChatApi from "./api/ChatApi";

const app = express();

app.set("port", 3000);

app.use(bodyParser.json());
app.get("/hello", (req: Request, res: Response, next: NextFunction) => {
    logger.info("Getting a request: " + req.query["k"]);
    res.send("hello from the server");
});

app.post("/message", ChatApi.sendMessage);
app.get("/message", ChatApi.fetchMessages);

export default app;