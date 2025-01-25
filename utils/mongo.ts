
import { MongoClient, ServerApiVersion } from "mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function findMany(collectionName: string, filter: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.find(filter).toArray();
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}


export async function findOne(collectionName: string, filter: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.findOne(filter);
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function find(collectionName: string, filter: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.find(filter).toArray();
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function insertOne(collectionName: string, data: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function updateOne(collectionName: string, filter: any, update: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, update);
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export async function deleteOne(collectionName: string, filter: any) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(filter);
    return result;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  } finally {
    await client.close();
  }
}
