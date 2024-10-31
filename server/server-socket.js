import { io } from "./server.js";
import { indexEvents } from "./events/index.js";
import { documentEvents } from "./events/document.js";

io.on("connection", (socket) => {
  // console.log(`a user connected. ID: ${socket.id}`);

  indexEvents(socket, io);
  documentEvents(socket, io);

  socket.on("disconnect", (msg) => {
    // console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });
});
