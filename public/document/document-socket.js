import { getCookie } from "../utils/cookies.js";
import {
  addInnerHtmlUsersList,
  documentAlert,
  returnHome,
  returnHomeFromDocument,
  returnLoginFromDocument,
  updateInnerHtmlUsersList,
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

socket.on("userAlreadyConnected", (documentName) => {
  documentAlert("User already connected");
  returnHome();
});

socket.on("sendingPayload", (payload) => {
  socket.emit("sendingBackPayload", payload);
});

socket.on("documentPayloadLoaded", ({ text, users, document }) => {
  updateInnerHtmlUsersList("");
  users.forEach((user) => {
    addInnerHtmlUsersList(`<li class="list-group-item">${user}</li>`);
  });
  updateTextEditor(text);
});

socket.on("text_value_server_to_client", (arg) => {
  updateTextEditor(arg);
});

socket.on("userDisconnected", (usersList) => {
  updateInnerHtmlUsersList("");
  usersList.forEach((user) => {
    addInnerHtmlUsersList(`<li class="list-group-item">${user}</li>`);
  });
});

socket.on("documentDeleted", (documentName) => {
  returnHomeFromDocument(documentName);
});
