import { Client, Account } from "appwrite";

export const client = new Client();
// export const creatClient = createClient({
//   endpoint: "https://cloud.appwrite.io/v1",
//   project: "65f69e4c399f9d7e2938",
// });

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("65f69e4c399f9d7e2938"); // Your project ID

const collectionID = "process.env.REACT_APP_COLLECTION_ID";
const databaseID = "process.env.REACT_APP_DATABASE_ID";
