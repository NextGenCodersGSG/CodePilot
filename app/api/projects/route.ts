import { connection } from '@/DB/connection';
import projectModel from '@/DB/models/projects.model';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log("befor connction to find projects ")
        await connection();
        console.log("after connction to find projects ")
        const totalAIReviews = await projectModel.countDocuments(); 
        console.log(totalAIReviews);
        return NextResponse.json({ totalAIReviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total AI reviews:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
