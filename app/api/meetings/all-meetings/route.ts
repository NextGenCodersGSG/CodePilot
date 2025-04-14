import meetingService from '@/module/services/meeting.service';
import { getToken } from '@/lib/storeGetDelete';
import { NextRequest, NextResponse } from 'next/server';
import { connection } from '@/DB/connection';

export async function GET(req: NextRequest) {
    await connection();
    try {
        const token = await getToken();

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const meetings = await meetingService.getDeveloperMeetings(token.userId);
        
        if(!meetings.length){
            return NextResponse.json({ message: "No meetings Founds"}, { status: 404 });
        }
        return NextResponse.json({meetings}, { status: 201 });
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