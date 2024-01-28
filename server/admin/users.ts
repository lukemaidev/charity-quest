"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const userSchema = z.object({
  _id: z.string(),
  userName: z.string(),
  email: z.string().email(),
  userType: z.string(),
  resolutionIds: z.array(z.string()),

})

export type User = z.infer<typeof userSchema>;

export async function getAllUsers() {
  try {
    const client = await clientPromise;
    const user = client.db("resolution").collection("user");
    const result = (await user.find({}).toArray())
    return await result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getUserById(id: string) {
  try {
    const client = await clientPromise;
    const user = client.db("resolution").collection("user");
    const result = user.findOne({ _id: new ObjectId(id) })
    return result
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function getUserByEmail(email: string) {
  try {
    const client = await clientPromise;
    const user = client.db("resolution").collection("user");
    const result = user.findOne({ email: email})
    return result
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createUser(user: any) {
  try {
    const client = await clientPromise;
    const userCollection = client.db("resolution").collection("user");
    const result = await userCollection.insertOne(user);
    return await result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function updateUser(id: string, user: any) {
  try {
    const client = await clientPromise;
    const userCollection = client.db("resolution").collection("user");
    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );
    return await result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function deleteUser(id: string) {
  try {
    const client = await clientPromise;
    const userCollection = client.db("resolution").collection("user");
    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
    const resolutionCollection = client.db("resolution").collection("resolution");
    const resolutionResult = await resolutionCollection.deleteMany({ userId: id });
    return await result;
  } catch (err) {
    console.log(err);
    return [];
  }
}