import { getCookie } from "../utils/cookies.js";
import { returnHomeFromDocument, updateTextEditor } from "./document.js";

const socket = io("/validate", {
  query: {
    token: getCookie("token"),
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
