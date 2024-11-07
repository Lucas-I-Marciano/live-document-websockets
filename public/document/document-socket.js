import { getCookie } from "../utils/cookies.js";
import {
  documentAlert,
  returnHomeFromDocument,
  returnLoginFromDocument,
  updateTextEditor,
} from "./document.js";

const socket = io("http://localhost:3000/validate", {
  query: {
    token: getCookie("token"),
  },
});

export function socketEmitEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("connect_error", (error) => {
  documentAlert(error.message);
  returnLoginFromDocument();
});

socket.on("textLoadedServerToClient", (arg) => {
  updateTextEditor(arg);
});

socket.on("text_value_server_to_client", (arg) => {
  updateTextEditor(arg);
});

socket.on("documentDeleted", (documentName) => {
  returnHomeFromDocument(documentName);
});
