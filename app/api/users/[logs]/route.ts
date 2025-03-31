// pages/api/auth/logs.ts
import CountLogs from '@/DB/models/count-logs.model';
import { NextApiRequest, NextApiResponse } from 'next';
import {connection} from '@/DB/connection'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            console.log("Connecting to the database...");
                await connection(); 
            console.log("Database connected successfully.");
            
            const logs = await CountLogs.find(); 
            return res.status(200).json(logs);            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}