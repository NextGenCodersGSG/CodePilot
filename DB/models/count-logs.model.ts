import mongoose, { Document, Schema } from 'mongoose';

export interface ICountLogs extends Document {
    userId: string;  
    name: string;    
    email: string;   
    counter: number; 
}

const countLogsSchema = new Schema<ICountLogs>({
    userId: { type: String, required: true, unique: true },  // type can be String
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    counter: { type: Number, default: 0 } // Properly define counter
});

const CountLogs = mongoose.model<ICountLogs>('CountLogs', countLogsSchema);
export default CountLogs;
