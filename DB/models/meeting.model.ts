import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELED'],
        default: 'PENDING'
    },
    requestedAt: { type: Date, default: Date.now },
    scheduledAt: { type: Date, required: true },
    duration: { type: Number, default: 30, min: 15, max: 120 },
    developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    zoomMeeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Zoom' }
}, { timestamps: true });

const MeetingModel =  mongoose.models.Meeting || mongoose.model('Meeting', meetingSchema);
export default MeetingModel;