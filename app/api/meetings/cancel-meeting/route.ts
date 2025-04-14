import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/DB/connection";
import meetingService from "@/module/services/meeting.service";

export async function POST(req: NextRequest) {
    await connection();
    try {
        const { meetingId } =  await req.json();
        if (!meetingId) {
            return NextResponse.json({ error: "Meeting Id is required" }, { status: 400 });
        }
        await meetingService.cancelMeeting(meetingId as string);
        
        return NextResponse.json(
            {
                message: "Meeting Canceled successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
