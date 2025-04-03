// pages/api/logUserIn.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/DB/connection';
import CountLogs from '@/DB/models/count-logs.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, name, email } = req.body;

            await connection();

            // Find or create the log entry for the user
            const userLog = await CountLogs.findOneAndUpdate(
                { userId },
                { 
                    $set: { name, email }, // Update name and email if they change
                    $inc: { counter: 1 }    // Increment the login counter
                },
                { new: true, upsert: true } // Create if it doesn't exist
            );

            return res.status(200).json({ message: 'User logged in successfully', userLog });
        } catch (error) {
            console.error('❌ Error logging in user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}