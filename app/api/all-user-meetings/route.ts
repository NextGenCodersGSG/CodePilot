import meetingService from "@/module/services/meeting.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest){
    try {
        const userId = req.nextUrl.searchParams.get('userId');

        if(!userId){
            return NextResponse.json({error: "User Id is required"}, {status: 400});
        }
        const response = await meetingService.getUserMeetings(userId);
            
        console.log(response);
        return NextResponse.json(response, {status: 200});
    } catch (error) {   
        console.error(error);
    }
}