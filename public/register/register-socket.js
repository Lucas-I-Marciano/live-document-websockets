import { cleanFields, pageAlert } from "./register.js";

const socket = io();

export function socketRegisterEmit(eventName, data) {
  socket.emit(eventName, data);
}

socket.on("userCreated", (name) => {
  pageAlert(`User ${name} created!`);
  cleanFields();
});
