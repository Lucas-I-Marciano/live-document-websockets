import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { Server } from "socket.io";
import "./db/connection.js";

const app = express();
const server = createServer(app);
export const io = new Server(server);

const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectory = resolve(__dirname, "../public");

app.use(express.static(publicDirectory)); // I must use it for browser serving static files in Express, specifing the root directory from which to serve static assets

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../public/", "index.html"));
});

server.listen(port, () => {
  console.log(`Server listening. Port: ${port}`);
});
