import { returnHomeFromDocument, updateTextEditor } from "./document.js";

const socket = io("/validate", {
  query: {
    token: String(window.localStorage.getItem("token")),
  },
});

export function socketEmitEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("textLoadedServerToClient", (arg) => {
  updateTextEditor(arg);
});

socket.on("text_value_server_to_client", (arg) => {
  updateTextEditor(arg);
});

socket.on("documentDeleted", (documentName) => {
  returnHomeFromDocument(documentName);
});
