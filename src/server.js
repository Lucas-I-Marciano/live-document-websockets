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
const publicDirectory = resolve(__dirname, "../public");
console.log(resolve(__dirname, "../public/", "index.html"));

app.use(express.static(publicDirectory)); // I must use it for browser serving static files in Express, specifing the root directory from which to serve static assets

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../public/", "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening. Port: ${port}`);
});
