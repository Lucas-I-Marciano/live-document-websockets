import { socketRegisterEmit } from "./register-socket.js";

const myForm = document.getElementById("form-register");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("input-user").value;
  const password = document.getElementById("input-password").value;

  socketRegisterEmit("createUser", { name, password });
});
