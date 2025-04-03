// pages/api/countLoggedInUsers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/DB/connection';
import CountLogs from '@/DB/models/count-logs.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connection();
        const totalUsers = await CountLogs.countDocuments(); // Count documents in CountLogs
        return res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('❌ Error counting users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}