import { io } from "./server.js";

const documentText = {
  JavaScript: "Javas",
  Node: "",
  "Socket.io": "",
};

io.on("connection", (socket) => {
  // console.log(`a user connected. ID: ${socket.id}`);

  socket.on("documentName", (arg) => {
    socket.join(arg);

    const document = findDocument(arg);
    if (document) {
      socket.nsp.to(arg).emit("textLoadedServerToClient", documentText[arg]); // I could use io.to(arg)
    }
  });

  socket.on("keyupEvent", ({ text, documentName }) => {
    const document = findDocument(arg);
    if (document) {
      documentText[documentName] = text;
      socket.to(documentName).emit("text_value_server_to_client", text); // I could use io.emit() to send this event to all clients, but I need to send to all but this one that is emitting. I am getting the message from Front-end and sending back to all sockets connected. Another detail is that I am doing it just for socket connected at the same room
    }
  });

  socket.on("disconnect", (msg) => {
    // console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });
});

function findDocument(documentName) {
  return Object.keys(documentText).find((name) => {
    return name === documentName;
  });
}
