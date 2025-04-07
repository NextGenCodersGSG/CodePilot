import MeetingModel from "@/DB/models/meeting.model";
import { IMeeting, Role, Status } from "@/@types/index";

export class MeetingRepository {
    async createMeeting(data: IMeeting, userId: string) {
        const meeting: IMeeting = await MeetingModel.create({
            title: data.title,
            description: data.description,
            developer: data.developerId,
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

        async rejectMeeting( meeting: any){
        meeting.status = Status.REJECTED;
        return await meeting.save();
    }

        async cancelMeeting( meeting: any){
        meeting.status = Status.CANCELED;
        return await meeting.save();
    }
    
    async findMeetingsByUser(userId:string) {
        return MeetingModel.find({ user: userId })
        .populate({
            path: 'zoomMeeting',
            select: 'joinUrl password zoomId',
            options: { lean: true }
        })
        .lean();
    }

    async findMeetingsByDeveloper(developerId: string) {
        return MeetingModel.find({ developer: developerId })
            .populate({
                path: 'zoomMeeting',
                select: 'startUrl zoomId password',
                options: { lean: true }
            })
            .lean();
    }
}

export default new MeetingRepository();
