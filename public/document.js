import { socketEmitEvent } from "./document-socket.js";

const textEditor = document.getElementById("text-editor");
const documentName = new URLSearchParams(window.location.search).get("name");
const documentTitle = document.getElementById("document-title");
documentTitle.innerText = documentName;

socketEmitEvent("documentName", documentName);

textEditor.addEventListener("keyup", () => {
  socketEmitEvent("keyupEvent", textEditor.value);
});

export function updateTextEditor(text) {
  textEditor.value = text;
}
