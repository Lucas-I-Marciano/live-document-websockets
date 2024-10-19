import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const urlConnection = `mongodb+srv://admin:${process.env.DB_PASSWORD}@mycluster.mcagnpx.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster`;

let documents;

try {
  const client = new MongoClient(urlConnection);
  const database = client.db("websocket");
  documents = database.collection("documents");

  console.log("Database Connection: Successful!");
} catch (error) {
  console.log("Database Connection: Failed!");
  console.error(error.message);
}

export { documents };
