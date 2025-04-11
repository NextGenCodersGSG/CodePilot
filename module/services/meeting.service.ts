import UserRepository from "../repositories/user.repo";
import meetingRepo from "../repositories/meeting.repo";
import { IMeeting, IZoom, Role, Status } from "@/@types/index";
import zoomRepo from "../repositories/zoom.repo";
import { getZoomAccessToken } from '@/lib/zoomAccessToken'
import userRepo from "../repositories/user.repo";

class MeetingService {
    async requestMeeting(data: IMeeting) {
        if(!data.developerId){
            throw new Error("You Must Choose The Developer");
        }
        const developer = await UserRepository.findUserById(data.developerId, Role.Developer);
        if (!developer) {
            throw new Error("Invalid Developer");
        }
        data.scheduledAt = new Date(data.scheduledAt);
        const conflictMeetings = await meetingRepo.conflictMeetings(data.developerId, data.scheduledAt, data.duration);
        if(conflictMeetings.length){
            throw new Error("Developer Unavailable at this time");
        }
        console.log(typeof data.scheduledAt);
        const user = await userRepo.findUserById(data.userId, Role.User);
        if(!user){
            throw new Error("User Not Found");
        }
        try {
            await meetingRepo.createMeeting(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async approveMeeting(meetingId: string) {
        const meeting = await meetingRepo.findMeetingById(meetingId);

        if (meeting.status != Status.PENDING) {
            throw new Error("Only Pending Requests Can Be Approved");
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
            meetingId: meeting._id,
            zoomId: zoomResponse.uuid,
            joinUrl: zoomResponse.join_url,
            startUrl: zoomResponse.start_url,
            password: zoomResponse.password
        }

        const zoomMeeting = await zoomRepo.createZoom(ZoomData);

        await meetingRepo.approveRequest(zoomMeeting._id, meeting);
    }

    async rejectMeeting(meetingId: string) {
        const meeting = await meetingRepo.findMeetingById(meetingId);

        if (!meeting) {
            throw new Error("Meeting Not Found");
        }
        
        if (meeting.status != Status.PENDING) {
            throw new Error("Only Pending Request Rejected");
        }

        await meetingRepo.rejectMeeting(meeting);
    }

    async cancelMeeting(meetingId: string){
        const meeting = await meetingRepo.findMeetingById(meetingId);

        if (!meeting) {
            throw new Error("Meeting Not Found");
        }

        if(meeting.status != Status.PENDING){
            throw new Error("Only Pending Request Canceled");
        }
        
        await meetingRepo.cancelMeeting(meeting);
    }

    async getUserMeetings(userId: string) {
        const user = await userRepo.findUserById(userId, Role.User);
        if(!user){
            throw new Error("User Not Found");
        }
        const meetings = await meetingRepo.findMeetingsByUser(userId);
        return this.transformMeetings(meetings, Role.User);
    }

    async getDeveloperMeetings(developerId: string) {
        const developer = await userRepo.findUserById(developerId, Role.Developer);
        if(!developer){
            throw new Error("Developer Not Found");
        }
        const meetings = await meetingRepo.findMeetingsByDeveloper(developerId);
        return this.transformMeetings(meetings, Role.Developer);
    }

    private transformMeetings(meetings: any[], role:  Role.User | Role.Developer) {
        return meetings.map(meeting => ({
            id: meeting._id.toString(),
            title: meeting.title,
            description: meeting.description,
            status: meeting.status,
            scheduledAt: meeting.scheduledAt,
            duration: meeting.duration,
            ...(meeting.status === 'APPROVED' && meeting.zoomMeeting ? {
                zoom: this.getZoomDetails(meeting.zoomMeeting, role)
            } : null)
        }));
    }

    private getZoomDetails(zoomMeeting: any, role: Role.User | Role.Developer) {
        if (role === Role.Developer) {
            return {
                startUrl: zoomMeeting.startUrl,
                zoomId: zoomMeeting.zoomId,
                password: zoomMeeting.password
            };
        } else {
            return {
                joinUrl: zoomMeeting.joinUrl,
                zoomId: zoomMeeting.zoomId,
                password: zoomMeeting.password
            };
        }
    }
}

export default new MeetingService();
