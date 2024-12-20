import {
  addDocumentList,
  pageAlert,
  pageAlertDocumentExists,
  reloadIndexPage,
  returnLoginFromIndex,
} from "./index.js";
import { getCookie } from "./utils/cookies.js";

const socket = io("http://localhost:3000/validate", {
  query: {
    token: getCookie("token"),
  },
});

socket.emit("loadIndex");

socket.on("connect_error", (error) => {
  pageAlert(error.message);
  returnLoginFromIndex();
});

socket.on("documentNameToIndex", (documentName) => {
  addDocumentList(documentName);
});

socket.on("documentAlreadyCreated", (documentName) => {
  pageAlertDocumentExists(documentName);
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
