import { documents } from "./database-connection.js";

export function findDocument(documentName) {
  const document = documents.findOne({
    name: documentName,
  });
  return document;
}

export async function updateDocument(documentName, documentText) {
  const result = await documents.updateOne(
    {
      name: documentName,
    },
    {
      $set: {
        text: documentText,
      },
    }
  );
  return result;
}

export function getAllDocuments() {
  const cursorResult = documents.find();

  return cursorResult;
}
