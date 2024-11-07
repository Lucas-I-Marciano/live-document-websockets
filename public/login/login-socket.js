import { loginAlert, redirect } from "./login.js";
import { storeLocalStorage } from "../utils/storeLocalStorage.js";
import { createCookie } from "../utils/cookies.js";

const socket = io("http://localhost:3000/");

export function emitGeneralEvent(eventName, arg) {
  socket.emit(eventName, arg);
}

socket.on("userAuthenticated", (jwtToken) => {
  createCookie("token", jwtToken);
  loginAlert(`User Authenticated`);
  redirect("/");
});
