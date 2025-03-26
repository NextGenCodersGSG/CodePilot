import mongoose, { Schema, Document } from "mongoose";

export interface ICodeReview extends Document {
  user: mongoose.Types.ObjectId;
  language: string;
  codeFile: string;
  createdAt: Date;
}

const CodeReviewSchema = new Schema<ICodeReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, required: true, unique: true },
    codeFile: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const codeReviewModel = mongoose.models.CodeReview || mongoose.model<ICodeReview>("CodeReview", CodeReviewSchema);
export default codeReviewModel;