import { ICodeReview } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface ICodeReviewDocument extends Document, ICodeReview {}

const CodeReviewSchema = new Schema<ICodeReviewDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, required: true, unique: true },
    codeFile: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const codeReviewModel =
  mongoose.models.CodeReview ||
  mongoose.model<ICodeReviewDocument>("CodeReview", CodeReviewSchema);
export default codeReviewModel;
