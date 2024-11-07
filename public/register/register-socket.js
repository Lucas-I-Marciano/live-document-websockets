import { cleanFields, pageAlert } from "./register.js";

const socket = io("http://localhost:3000");

export function socketRegisterEmit(eventName, data) {
  socket.emit(eventName, data);
}

socket.on("userCreated", (name) => {
  pageAlert(`User ${name} created!`);
  cleanFields();
});

socket.on("userExists", (name) => {
  pageAlert(`User ${name} already exists!`);
});
