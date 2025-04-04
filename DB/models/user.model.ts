import crypto from "crypto";
import { IUser, Role } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IUserDocument extends Document, IUser {
  verifyToken: string;
  verifyTokenExpire: Date;
  getVerificationToken(): string;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(Role), required: true },
    password: { type: String, required: true },
    verifyToken: { type: String },
    verifyTokenExpire: { type: Date },
  },
  { timestamps: true }
);

UserSchema.methods.getVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.verifyToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  return verificationToken;
};

const userModel =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
export default userModel;
