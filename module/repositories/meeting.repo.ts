import MeetingModel from "@/DB/models/meeting.model";
import { IMeeting, Status } from "@/@types/index";

export class MeetingRepository {
    async createMeeting(data: IMeeting, userId: string) {
        const meeting = await MeetingModel.create({
            title: data.title,
            description: data.description,
            admin: data.adminId,
            user: userId,
            scheduledAt: data.scheduledAt,
            duration: data.duration,
        });
        return meeting;
    }

    async approveRequest(zoomId: string, meeting: any){
        meeting.status = Status.APPROVED;
        meeting.zoomMeeting = zoomId;
        return await meeting.save();
    }

    async findMeetingById(id: string){
        return MeetingModel.findById(id);
    }
}

export default new MeetingRepository();
