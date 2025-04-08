import { NextResponse } from "next/server";
import CodeReviewService from "@/module/services/codeReview.service";
import { connection } from "@/DB/connection";
import { generateCsv } from "@/lib/csvExports";

export async function GET() {
    try {
        await connection();
        const reviews = await CodeReviewService.findAll();

        if (!reviews.length) {
            return NextResponse.json({ error: "No CodeReview Found" }, { status: 400 });
        }

        // Generate CSV data
        const csv = generateCsv(reviews);

        // Return CSV as a file
        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="reviews.csv"',
            },
        });
    } catch (error) {
        console.error("CSV Export Error:", error);
        return NextResponse.json({ error: "Failed to export users" }, { status: 500 });
    }
}