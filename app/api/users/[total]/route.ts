import { NextResponse } from 'next/server';
import {connection} from '@/DB/connection'; // Ensure this path is correct
import userModel from '@/DB/models/user.model'; // Ensure this path is correct

export async function GET() {
  try {
    console.log("Connecting to the database...");
    await connection(); 
    console.log("Database connected successfully.");

    const totalUsers = await userModel.countDocuments(); 
    console.log(`Total users in the database: ${totalUsers}`);

    return NextResponse.json({ total: totalUsers });
  } catch (error) {
    console.error("Error accessing the database:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
