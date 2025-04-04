import UserRepository from "../repositories/user.repo";
import meetingRepo from "../repositories/meeting.repo";
import { getToken } from "@/lib/storeGetDelete";
import { IMeeting } from "@/@types/index";

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
            await meetingRepo.createMeeting(data, "67e739cda57e9a21681f044b");
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new MeetingService();
