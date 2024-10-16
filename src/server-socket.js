import { io } from "./server.js";

io.on("connection", (socket) => {
  console.log(`a user connected. ID: ${socket.id}`);
  socket.on("disconnect", (msg) => {
    console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });

  socket.on("keyupEvent", (text) => {
    socket.broadcast.emit("text_value_server_to_client", text); // I could use io.emit() to send this event to all clients, but I need to send to all but this one that is emitting. I am getting the message from Front-end and sending back to all sockets connected
  });
});
