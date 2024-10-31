const myForm = document.getElementById("form-register");

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = document.getElementById("input-user").value;
  const password = document.getElementById("input-password").value;
});
