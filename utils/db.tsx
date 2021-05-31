import { MongoClient } from "mongodb";

export const getDatabase = async() => {
  const client = await MongoClient.connect('mongodb+srv://ruben:9Sr6D9zupZ59R3G@cluster0.yk6k7.mongodb.net/attendance?retryWrites=true&w=majority');
  return client.db();;
}
