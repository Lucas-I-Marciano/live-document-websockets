import { loginAlert, redirect } from "./login.js";

const socket = io();

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("userAuthenticated", (jwtToken) => {
  window.localStorage.setItem("token", jwtToken);
  loginAlert(`User Authenticated`);
  redirect("/");
});
