import "dotenv/config";

import { io } from "./server.js";
import { indexEvents } from "./events/index.js";
import { documentEvents } from "./events/document.js";
import { registerEvents } from "./events/register.js";
import { loginEvents } from "./events/login.js";

io.on("connection", (socket) => {
  // console.log(`a user connected. ID: ${socket.id}`);

  indexEvents(socket, io);
  documentEvents(socket, io);
  registerEvents(socket, io);
  loginEvents(socket, io);

  socket.on("disconnect", (msg) => {
    // console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });
});
