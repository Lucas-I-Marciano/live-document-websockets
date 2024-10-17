import { updateTextEditor } from "./document.js";

const socket = io();

export function socketEmitEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("textLoadedServerToClient", (arg) => {
  updateTextEditor(arg);
});

socket.on("text_value_server_to_client", (arg) => {
  updateTextEditor(arg);
});
