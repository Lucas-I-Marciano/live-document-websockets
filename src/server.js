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
  socket.on("keyupEvent", (text) => {
    socket.broadcast.emit("text_value_server_to_client", text); // I could use io.emit() to send this event to all clients, but I need to send to all but this one that is emitting. I am getting the message from Front-end and sending back to all sockets connected
  });
});

server.listen(port, () => {
  console.log(`Server listening. Port: ${port}`);
});
