import MeetingModel from "@/DB/models/meeting.model";
import { IMeeting, Status } from "@/@types/index";

export class MeetingRepository {
    async createMeeting(data: IMeeting) {
        const meeting = await MeetingModel.create({
            title: data.title,
            description: data.description,
            admin: data.devId,
            user: data.userId,
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

        async rejectMeeting( meeting: any){
        meeting.status = Status.REJECTED;
        return await meeting.save();
    }

        async cancelMeeting( meeting: any){
        meeting.status = Status.CANCELED;
        return await meeting.save();
    }
}

export default new MeetingRepository();
