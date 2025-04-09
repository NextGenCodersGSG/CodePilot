import { connection } from '@/DB/connection';
import AIReviewResponseModel from '@/DB/models/ai-review-response.model';
import codeReviewModel from '@/DB/models/code-review.model';
import projectModel from '@/DB/models/projects.model';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log("befor connction to find ai review total ")
        await connection();
        console.log("after connction to find ai review total ")
        const totalAIReviews = await codeReviewModel.countDocuments(); 
        console.log(totalAIReviews);
        return NextResponse.json({ totalAIReviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total AI reviews:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}