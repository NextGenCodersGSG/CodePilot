// DB/models/countLogs.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICountLogs extends Document {
    userId: string;  // Define as a primitive string
    name: string;    // Define as a primitive string
    email: string;   // Define as a primitive string
    counter: number; // Define as a primitive number
}

const countLogsSchema = new Schema<ICountLogs>({
    userId: { type: String, required: true, unique: true },  // type can be String
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    counter: { type: Number, default: 0 } // Properly define counter
});

// Create and export the model
const CountLogs = mongoose.model<ICountLogs>('CountLogs', countLogsSchema);
export default CountLogs;