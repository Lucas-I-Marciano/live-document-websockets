import { io } from "./server.js";
import {
  findDocument,
  updateDocument,
  getAllDocuments,
} from "./database-operations.js";

const documentText = {
  JavaScript: "Javas",
  Node: "",
  "Socket.io": "",
};

io.on("connection", (socket) => {
  // console.log(`a user connected. ID: ${socket.id}`);

  // Index socket
  socket.on("loadIndex", async () => {
    const cursor = await getAllDocuments();
    cursor.forEach((document) => {
      socket.emit("documentNameToIndex", document["name"]);
    });
  });

  // Document socket
  socket.on("documentName", async (arg) => {
    const document = await findDocument(arg);
    socket.join(document.name);

    if (document) {
      socket.nsp.to(arg).emit("textLoadedServerToClient", document.text); // I could use io.to(arg)
    }
  });

  socket.on("keyupEvent", ({ text, documentName }) => {
    const document = findDocument(documentName);
    if (document) {
      updateDocument(documentName, text);

      socket.to(documentName).emit("text_value_server_to_client", text); // I could use io.emit() to send this event to all clients, but I need to send to all but this one that is emitting. I am getting the message from Front-end and sending back to all sockets connected. Another detail is that I am doing it just for socket connected at the same room
    }
  });

  socket.on("disconnect", (msg) => {
    // console.log(`user disconnected. ID: ${socket.id}. Message: ${msg}`);
  });
});
