import { addDocumentList, pageAlert, reloadIndexPage } from "./index.js";

const socket = io();

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
