import { addDocumentList, pageAlert, reloadIndexPage } from "./index.js";
import { getCookie } from "./utils/cookies.js";

const socket = io("/validate", {
  query: {
    token: getCookie("token"),
  },
});

socket.emit("loadIndex");

socket.on("documentNameToIndex", (documentName) => {
  addDocumentList(documentName);
});

socket.on("documentAlreadyCreated", (documentName) => {
  pageAlert(documentName);
});

socket.on("documentCreated", () => {
  reloadIndexPage();
});

socket.on("documentDeleted", (documentName) => {
  reloadIndexPage();
});

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);
}
