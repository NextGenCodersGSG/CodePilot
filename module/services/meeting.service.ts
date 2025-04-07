import UserRepository from "../repositories/user.repo";
import meetingRepo from "../repositories/meeting.repo";
import { IMeeting, IZoom, Status } from "@/@types/index";
import zoomRepo from "../repositories/zoom.repo";
import {getZoomAccessToken} from '@/lib/zoomAccessToken'

class MeetingService {
    async requestMeeting(data: IMeeting) {
        const admin = UserRepository.findAdminById(data.adminId);
        if (!admin) {
            throw new Error("Invalid Admin");
        }
        // const user = await getToken();
        // if (!user) {
        //     throw new Error("Invalid User");
        // }
        try {
            await meetingRepo.createMeeting(data, "67eef879584b5be6828c372c");
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async approveMeeting(meetingId: string) {

        const meeting = await meetingRepo.findMeetingById(meetingId);

        if(meeting.status != Status.PENDING){
            throw new Error("Only Pending Request Approved");
        }

        if (!meeting) {
            throw new Error("Meeting Not Found");
        }
        const secretKey = await getZoomAccessToken();
        console.log(`token is: ${secretKey}`);
        const meetingData = {
            topic: meeting.title,
            type: 2,
            status: "waiting",
            start_time: meeting.start_time,
            duration: meeting.duration,
            timezone: "Asia/Jerusalem",
            settings: {
                host_video: false,
                participant_video: false,
                join_before_host: false,
                waiting_room: true,
            }
        }
        const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meetingData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Zoom API error: ${error.message}`);
        }

        const zoomResponse = await response.json();

        const ZoomData: IZoom = {
            meeting: meeting._id,
            zoomId: zoomResponse.uuid,
            joinUrl: zoomResponse.join_url,
            startUrl: zoomResponse.start_url,
            password: zoomResponse.password
        }

        const zoomMeeting = await zoomRepo.createZoom(ZoomData);

        await meetingRepo.approveRequest(zoomMeeting._id, meeting);
    }

    async rejectMeeting(meetingId: string){
        const meeting = await meetingRepo.findMeetingById(meetingId);

        if(meeting.status != Status.PENDING){
            throw new Error("Only Pending Request Rejected");
        }

        if (!meeting) {
            throw new Error("Meeting Not Found");
        }
        
        await meetingRepo.rejectMeeting(meeting);
    }

    async cancelMeeting(meetingId: string){
        const meeting = await meetingRepo.findMeetingById(meetingId);

        if(meeting.status != Status.PENDING){
            throw new Error("Only Pending Request Canceled");
        }

        if (!meeting) {
            throw new Error("Meeting Not Found");
        }
        
        await meetingRepo.cancelMeeting(meeting);
    }
}

export default new MeetingService();
