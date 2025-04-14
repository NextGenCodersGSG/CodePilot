import { NextResponse } from 'next/server';
import { connection } from '@/DB/connection';
import userModel from '@/DB/models/user.model';

export async function GET() {
    try {
        await connection(); 
        const users = await userModel.find(); 

        return NextResponse.json(users); 
    } catch (error) {
        console.error("Error fetching users:", error); 
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}