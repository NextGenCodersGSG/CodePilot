import zoomModel from "@/DB/models/zoom.model";
import { IZoom } from "@/@types/index";

export class ZoomRepository {
    async createZoom(data: IZoom) {
        const zoomMeeting = await zoomModel.create({
            meeting: data.meeting,
            zoomId: data.zoomId,
            joinUrl: data.joinUrl,
            startUrl: data.startUrl,
            password: data.password,
        });
        return zoomMeeting;
    }
}

export default new ZoomRepository();
