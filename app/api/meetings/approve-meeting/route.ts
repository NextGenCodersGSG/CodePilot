import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/DB/connection";
import meetingService from "@/module/services/meeting.service";

export async function POST(req: NextRequest) {
    await connection();
    try {
        // const { searchParams } = new URL(req.url);
        // const meetingId = searchParams.get("id");
        const {meetingId}=  await req.json();
        
        if (!meetingId) {
            return NextResponse.json({ error: "Meeting Id is required" }, { status: 400 });
        }
        await meetingService.approveMeeting(meetingId);
        return NextResponse.json(
            {
                message: "Meeting Approved successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
