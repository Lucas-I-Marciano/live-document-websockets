import { validateJwt } from "../../utils/createJwt.js";
import {
  findDocument,
  getAllDocuments,
  createDocument,
} from "../db/documents.js";

// Index socket
export function indexEvents(socket, io) {
  socket.on("loadIndex", async () => {
    const cursor = await getAllDocuments();
    cursor.forEach((document) => {
      socket.emit("documentNameToIndex", document["name"]);
    });
  });

  socket.on("addDocument", async (documentName) => {
    const isDocumentedCreated = await findDocument(documentName);
    if (!isDocumentedCreated) {
      const result = await createDocument(documentName);
      if (result["acknowledged"]) {
        socket.nsp.emit("documentCreated");
      } else {
        socket.nsp.emit("documentFailedCreation");
      }
    } else {
      socket.nsp.emit("documentAlreadyCreated", documentName);
    }
  });
}
