import { connection } from "@/DB/connection";
import userModel from "@/DB/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    await connection(); 

    try {
        const users = await userModel.find({}, { password: 0 }).lean(); // Fetch users without password
        res.status(200).json(users); // Return users as JSON
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}