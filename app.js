import express from "express";
import { createServer } from "http";
import { server as webSocketServer } from "websocket";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get("/", (_, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(8000, () => console.log("server listening on port 8000"));

const httpServer = createServer();
httpServer.listen(5000, () =>
  console.log("http Server listening on port 5000 ")
);

const wsServer = new webSocketServer({
  httpServer,
});

wsServer.on("request", (request) => {
  const connection = (requestion = request.accept(null, request.origin));
  connection.on("open", () => console.log("connection open!"));
  connection.on("close", () => console.log("connection closed!"));
  connection.on("message", (message) => {
    console.log("message", message.utf8Data);
  });
});
