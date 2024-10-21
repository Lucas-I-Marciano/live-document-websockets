import "./index-socket.js";
import { emitGeneralEvent } from "./index-socket.js";

const documentList = document.getElementById("document-list");
const formAdd = document.getElementById("form-add-document");
const inputDocument = document.getElementById("input-document");
formAdd.addEventListener("submit", (event) => {
  emitGeneralEvent("addDocument", inputDocument.value);
  event.preventDefault();
});

export function addDocumentList(documentName) {
  documentList.innerHTML += `
        <a
            href="document.html?name=${documentName}"
            class="list-group-item list-group-item-action"
        >
            ${documentName}
        </a>
    `;
}

export function reloadIndexPage() {
  if (window.location.pathname === "/") {
    window.location.reload();
  }
}
