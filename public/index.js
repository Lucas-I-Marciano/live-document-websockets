import "./index-socket.js";
import { emitGeneralEvent } from "./index-socket.js";
import { clearCookie } from "./utils/cookies.js";

const documentList = document.getElementById("document-list");
const formAdd = document.getElementById("form-add-document");
const inputDocument = document.getElementById("input-document");
const buttonLogout = document.getElementById("button-logout");

formAdd.addEventListener("submit", (event) => {
  emitGeneralEvent("addDocument", inputDocument.value);
  event.preventDefault();
});

buttonLogout.addEventListener("click", () => {
  clearCookie("token");
  window.location.href = "/login/index.html";
});

export function addDocumentList(documentName) {
  documentList.innerHTML += `
        <a
            href="./document/document.html?name=${documentName}"
            class="list-group-item list-group-item-action"
        >
            ${documentName}
        </a>
    `;
}

export function reloadIndexPage() {
  if (
    (window.location.pathname === "/") |
    (window.location.pathname === "/index.html")
  ) {
    window.location.reload();
  }
}

export function pageAlertDocumentExists(documentName) {
  const text = `Document ${documentName} already exists\nDo you want to be redirected there?`;
  if (confirm(text)) {
    window.location.href = `http://${window.location.host}/document.html?name=${documentName}`;
  }
}

export function pageAlert(text) {
  alert(text);
}

export function returnLoginFromIndex() {
  window.location.href = `http://${window.location.host}/login/index.html`;
}
