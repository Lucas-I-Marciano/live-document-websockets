import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { Server } from "socket.io";
import "./db/connection.js";

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
  },
});

const server2 = createServer(app);
server2.listen(5000, () => console.log(`Server listening. Port: 5000`)); // Simulating front and back in different port

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
