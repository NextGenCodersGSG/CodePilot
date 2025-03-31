// pages/api/auth/logout.js

import { userLogout } from "@/module/services/auth-service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        const { userId } = req.body; // Capture userId from request body

        try {
            await userLogout(userId);
            return res.status(200).json({ message: 'User logged out' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}