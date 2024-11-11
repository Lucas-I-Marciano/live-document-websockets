import { socketEmitEvent } from "./document-socket.js";

const textEditor = document.getElementById("text-editor");
const documentName = new URLSearchParams(window.location.search).get("name"); // Example: window.location.search = "?name=JavaScript". URLSearchParams will provide methods to interact to each params of my URL (in this case to get document name value)
const documentTitle = document.getElementById("document-title");
documentTitle.innerText = documentName;

const buttonDelete = document.getElementById("delete-document");

socketEmitEvent("documentLoad", documentName);

buttonDelete.addEventListener("click", () => {
  socketEmitEvent("deleteDocument", documentName);
});

textEditor.addEventListener("keyup", () => {
  socketEmitEvent("keyupEvent", { text: textEditor.value, documentName });
});

export function updateTextEditor(text) {
  textEditor.value = text;
}

export function returnHomeFromDocument(documentNameArg) {
  if (documentNameArg === documentName) {
    window.location.href = `http://${window.location.host}`;
  }
}

export function returnLoginFromDocument() {
  window.location.href = `http://${window.location.host}/login/index.html`;
}

export function documentAlert(text) {
  alert(text);
}
