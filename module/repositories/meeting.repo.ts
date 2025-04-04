import MeetingModel from "@/DB/models/meeting.model";
import { IMeeting } from "@/@types/index";

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
}

export default new MeetingRepository();
