import { socketRegisterEmit } from "./register-socket.js";

const myForm = document.getElementById("form-register");
const nameElement = document.getElementById("input-user");
const passwordElement = document.getElementById("input-password");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  socketRegisterEmit("createUser", {
    name: nameElement.value,
    password: passwordElement.value,
  });
});

export function pageAlert(text) {
  alert(text);
}

export function cleanFields() {
  nameElement.value = "";
  passwordElement.value = "";
}
