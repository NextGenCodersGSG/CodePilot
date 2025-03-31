import { IUser, Role, UserRoles } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document, IUser {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(Role), default: Role.Guest },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
export default userModel;
