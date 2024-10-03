import express from "express";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../", "index.html"));
});

io.on("connection", () => {
  console.log("User connected");
});

server.listen(port, () => {
  console.log(`Server listening. Port: ${port}`);
});
