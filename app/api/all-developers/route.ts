// pages/api/developers.js

import { NextResponse } from 'next/server';
import { connection } from '@/DB/connection';
import userService from '@/module/services/user.service';
import { NextApiRequest } from 'next';

// Handle GET and POST requests
export async function GET() {
  try {
    await connection();
    const developers = await userService.getAllDevelopers();
    if (!developers.length) {
      return NextResponse.json({ error: 'No Developers Found' }, { status: 404 });
    }
    return NextResponse.json(developers);
  } catch (error) {
    console.error("Error fetching Developers:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
