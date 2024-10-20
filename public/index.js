import "./index-socket.js";

const documentList = document.getElementById("document-list");

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
