import {
  addUserDocument,
  getUserAndDocument,
  getUsersFromDocument,
  removeUserFromDocument,
} from "../../utils/usersConnected.js";
import {
  findDocument,
  updateDocument,
  deleteDocument,
} from "../db/documents.js";

// Document socket
export function documentEvents(socket, io) {
  socket.on("sendingBackPayload", (payload) => {
    socket.on("documentLoad", async (arg) => {
      const document = await findDocument(arg);

      if (document) {
        socket.join(document.name);
        addUserDocument(payload["username"], document.name);
        const listUsers = getUsersFromDocument(document.name);
        socket.nsp.to(arg).emit("documentPayloadLoaded", {
          text: document.text,
          users: listUsers,
          document: document.name,
        }); // I could use io.to(arg)
      }
      socket.on("disconnect", () => {
        // console.log(getUserAndDocument(payload["username"], document.name));
        removeUserFromDocument(payload["username"]);
        const listUsers = getUsersFromDocument(document.name);
        io.emit("userDisconnected", listUsers);
      });
    });
  });

  socket.on("keyupEvent", ({ text, documentName }) => {
    const document = findDocument(documentName);
    if (document) {
      updateDocument(documentName, text);

      socket.to(documentName).emit("text_value_server_to_client", text); // I could use io.emit() to send this event to all clients, but I need to send to all but this one that is emitting. I am getting the message from Front-end and sending back to all sockets connected. Another detail is that I am doing it just for socket connected at the same room
    }
  });

  socket.on("deleteDocument", async (documentName) => {
    const result = await deleteDocument(documentName);
    if (result["deletedCount"]) {
      socket.nsp.emit("documentDeleted", documentName);
    } else {
      socket.nsp.emit("documentFailedDeletion", documentName);
    }
  });
}
