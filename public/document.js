const socket = io();

const textEditor = document.getElementById("text-editor");

textEditor.addEventListener("keyup", () => {
  socket.emit("keyupEvent", textEditor.value);
});

socket.on("text_value_server_to_client", (arg) => {
  textEditor.value = arg;
});
