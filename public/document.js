import { socketEmitEvent } from "./document-socket.js";

export const textEditor = document.getElementById("text-editor");

textEditor.addEventListener("keyup", () => {
  socketEmitEvent("keyupEvent", textEditor.value);
});

export function updateTextEditor(text) {
  textEditor.value = text;
}
