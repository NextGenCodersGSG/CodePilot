import { connection } from '@/DB/connection';
import codeReviewModel from '@/DB/models/code-review.model';
import { NextResponse } from 'next/server';

export async function GET() {
    await connection();
    try {
        const totalAIReviews = await codeReviewModel.countDocuments(); 
        return NextResponse.json({ totalAIReviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total AI reviews:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}