import { Role, UserRoles } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRoles; 
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(Role), default: Role.Guest },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default userModel