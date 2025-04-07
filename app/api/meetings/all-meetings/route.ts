import meetingService from '@/module/services/meeting.service';
import { getToken } from '@/lib/storeGetDelete';
import { Role } from '../../../../@types/index';
import { NextRequest, NextResponse } from 'next/server';
import { connection } from '@/DB/connection';

export async function GET(req: NextRequest) {
    await connection();
    try {
        // const token = await getToken();
        // if (!token) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }
        // let meetings;
        // if(token.userRole === Role.Developer){
        //     meetings = await meetingService.getDeveloperMeetings(token.userId);
        // }else if(token.userRole === Role.User){
        //     meetings = await meetingService.getUserMeetings(token.userId);
        // }else{
            // return NextResponse.json({ Unauthorized }, { status: 401 });
        // 
        //}
        const meetings = await meetingService.getUserMeetings("67f31143d995b4975b5a97a0");
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