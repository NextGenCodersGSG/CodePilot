import { NextResponse } from "next/server";
import MeetingService from "@/module/services/meeting.service";
import { connection } from "@/DB/connection";
import { generateCsv } from "@/lib/csvExports";

export async function GET() {
    try {
        await connection();
        const meetings = await MeetingService.getAllMeetings();

        if (!meetings.length) {
            return NextResponse.json({ error: "No meetings Found" }, { status: 400 });
        }

        // Generate CSV data
        const csv = generateCsv(meetings);

        // Return CSV as a file
        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="meetings.csv"',
            },
        });
    } catch (error) {
        console.error("CSV Export Error:", error);
        return NextResponse.json({ error: "Failed to export meetings" }, { status: 500 });
    }
}