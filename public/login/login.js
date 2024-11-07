import { emitGeneralEvent } from "./login-socket.js";

const myForm = document.getElementById("form-login");
const usernameElement = document.getElementById("input-user");
const passwordElement = document.getElementById("input-password");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = usernameElement.value;
  const password = passwordElement.value;
  emitGeneralEvent("authenticateUser", { name, password });
});

export function redirect(path) {
  window.location.href = path;
}
export function loginAlert(message) {
  alert(message);
}
