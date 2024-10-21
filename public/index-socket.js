import { addDocumentList, reloadIndexPage } from "./index.js";

const socket = io();

socket.emit("loadIndex");

socket.on("documentNameToIndex", (documentName) => {
  addDocumentList(documentName);
});

socket.on("documentCreated", () => {
  reloadIndexPage();
});

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);
}
