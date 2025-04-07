import { NextRequest, NextResponse } from "next/server";
import { IMeeting } from "@/@types/index";
import { connection } from "@/DB/connection";
import meetingService from "@/module/services/meeting.service";

export async function POST(req: NextRequest) {
    await connection();
    try {
        const data: IMeeting = await req.json();
        if (!data) {
            return NextResponse.json({ error: "Data is required" }, { status: 400 });
        }
        await meetingService.requestMeeting(data);
        return NextResponse.json(
            {
                message: "Meeting Request successfully",
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
