import "dotenv/config";

import { io } from "./server.js";
import { indexEvents } from "./events/index.js";
import { documentEvents } from "./events/document.js";
import { registerEvents } from "./events/register.js";
import { loginEvents } from "./events/login.js";
import { validateUser } from "./middleware/validateUser.js";

const validateNsp = io.of("/validate");

validateNsp.use((socket, next) => {
  validateUser(socket, next);
});

validateNsp.on("connection", (socket) => {
  indexEvents(socket, io);
  documentEvents(socket, io);
});

io.on("connection", (socket) => {
  // console.log(`a user connected. ID: ${socket.id}`);

  registerEvents(socket, io);
  loginEvents(socket, io);

  socket.on("disconnect", (msg) => {
    // console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });
});
