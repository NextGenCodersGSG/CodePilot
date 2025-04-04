import mongoose, { Schema } from 'mongoose';
import { IZoom } from '@/@types/index';

export interface IZoomDocument extends Document, IZoom{}

const zoomSchema = new Schema<IZoomDocument>({
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    zoomId: { type: String, required: true },
    joinUrl: { type: String, required: true },
    startUrl: { type: String, required: true },
    password: { type: String }
}, { timestamps: true });

export default mongoose.models.Zoom || mongoose.model('Zoom', zoomSchema);