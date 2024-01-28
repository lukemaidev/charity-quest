"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";


const resolutionSchema = z.object({
    _id: z.instanceof(ObjectId),
    title: z.string(),
    userId: z.string(),
    observerId: z.string(),
    type: z.string(),
    description: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    money: z.number(),
    completed: z.boolean(),
    streak: z.number()
    })

export type Resolution = z.infer<typeof resolutionSchema>;

export async function getAllResolutions() {
    try {
        const client = await clientPromise;
        const resolution = client.db("resolution").collection("resolution");
        const result = (await resolution.find({}).toArray())
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getResolutionsByUserId(id: string) {
    try {
        const client = await clientPromise;
        const resolution = client.db("resolution").collection("resolution");
        const result = (await resolution.find({ userId: id }).toArray())
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function getResolutionById(id: string) {
    try {
        const client = await clientPromise;
        const resolution = client.db("resolution").collection("resolution");
        const result = resolution.findOne({ _id: new ObjectId(id) })
        return result
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function createResolution(resolution: any) {
    try {
        const client = await clientPromise;
        const resolutionCollection = client.db("resolution").collection("resolution");
        const result = await resolutionCollection.insertOne(resolution);
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function updateResolution(id: string, resolution: any) {
    try {
        const client = await clientPromise;
        const resolutionCollection = client.db("resolution").collection("resolution");
        const result = await resolutionCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: resolution }
        );
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function deleteResolution(id: string) {
    try {
        const client = await clientPromise;
        const resolutionCollection = client.db("resolution").collection("resolution");
        const result = await resolutionCollection.deleteOne({ _id: new ObjectId(id) });
        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function checkResolution(id: string) {
    try {
        const client = await clientPromise;
        const resolutionCollection = client.db("resolution").collection("resolution");
        const updatingResolution = await resolutionCollection.findOne({ _id: new ObjectId(id) });
        const result = await resolutionCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { streak: updatingResolution!.streak + 1, updatedAt: Date.now } }
        );

        return await result;
    } catch (err) {
        console.log(err);
        return [];
    }
}