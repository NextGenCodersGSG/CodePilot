import { NextResponse } from 'next/server';
import {connection} from '@/DB/connection'; // Ensure this path is correct
import userModel from '@/DB/models/user.model'; // Ensure this path is correct

export async function GET() {
  await connection();
  try {
    const totalUsers = await userModel.countDocuments(); 
    return NextResponse.json({ total: totalUsers });
  } catch (error) {
    console.error("Error accessing the database:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
