import { addDocumentList } from "./index.js";

const socket = io();

socket.emit("loadIndex");

socket.on("documentNameToIndex", (documentName) => {
  addDocumentList(documentName);
});
