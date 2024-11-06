import { loginAlert, redirect } from "./login.js";

const socket = io();

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("userAuthenticated", (name) => {
  loginAlert(`User:${name}\nAuthenticated`);
  redirect("/");
});
