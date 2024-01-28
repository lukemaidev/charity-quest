"use server"

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const charitySchema = z.object({
    _id: z.instanceof(ObjectId),
    name: z.string(),
    description: z.string(),
    website: z.string(),
    logo: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    })

export type Charity = z.infer<typeof charitySchema>;

export async function getAllCharities() {
    try {
        const client = await clientPromise;
        const charity = client.db("resolution").collection("charity");
        const result = (await charity.find({}).toArray())
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getCharityById(id: string) {
    try {
        const client = await clientPromise;
        const charity = client.db("resolution").collection("charity");
        const result = charity.findOne({ _id: new ObjectId(id) })
        return result
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function createCharity(charity: any) {
    try {
        const client = await clientPromise;
        const charityCollection = client.db("resolution").collection("charity");
        const result = await charityCollection.insertOne(charity);
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function updateCharity(id: string, charity: any) {
    try {
        const client = await clientPromise;
        const charityCollection = client.db("resolution").collection("charity");
        const result = await charityCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: charity }
        );
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function deleteCharity(id: string) {
    try {
        const client = await clientPromise;
        const charityCollection = client.db("resolution").collection("charity");
        const result = await charityCollection.deleteOne({ _id: new ObjectId(id) });
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}


