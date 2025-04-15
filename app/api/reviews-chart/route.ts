import { IChartData } from "@/@types";
import { connection } from "@/DB/connection";
import ChartsService from "@/module/services/charts.service";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connection();
    try {
        const reviewData: IChartData[] = await ChartsService.getReviewsData();
        if(!reviewData || reviewData.length === 0) {
            return NextResponse.json({codeReviewsData: []}, {status: 400});
        }
        return NextResponse.json({codeReviewsData: reviewData}, {status: 200});
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