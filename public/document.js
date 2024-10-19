import { socketEmitEvent } from "./document-socket.js";

const textEditor = document.getElementById("text-editor");
const documentName = new URLSearchParams(window.location.search).get("name"); // Example: window.location.search = "?name=JavaScript". URLSearchParams will provide methods to interact to each params of my URL (in this case to get document name value)
const documentTitle = document.getElementById("document-title");
documentTitle.innerText = documentName;

socketEmitEvent("documentName", documentName);

textEditor.addEventListener("keyup", () => {
  socketEmitEvent("keyupEvent", { text: textEditor.value, documentName });
});

export function updateTextEditor(text) {
  textEditor.value = text;
}
