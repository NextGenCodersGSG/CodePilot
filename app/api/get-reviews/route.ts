import { getReviewsPerDay } from "@/lib/getReviewsPerDay"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const reviewData = await getReviewsPerDay();
        if(!reviewData || reviewData.length === 0) {
            return NextResponse.json({reviews: []}, {status: 400});
        }
        return NextResponse.json({reviews: reviewData}, {status: 200});
    }
    catch(error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
    }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }

}