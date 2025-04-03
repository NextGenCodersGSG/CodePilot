import { userLogin } from '@/module/services/auth-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body; // No type assertion needed

        try {
            const userLog = await userLogin(data); // Call the function with the raw data
            return res.status(200).json({ message: 'User logged in', userLog });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}