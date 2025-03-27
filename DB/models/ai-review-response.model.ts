import mongoose, { Schema, Document } from "mongoose";

export interface IAIReviewResponse extends Document {
  review: mongoose.Types.ObjectId;
  description: string;
  performanceIssues: String;
  securityIssues: String;
  bugs: String;
  overallSuggestions: String;
}

const AIReviewResponseSchema = new Schema<IAIReviewResponse>(
  {
    review: { type: Schema.Types.ObjectId, ref: "CodeReview", required: true },
    description: { type: String, required: true },
    performanceIssues: { type: String, required: true },
    securityIssues: { type: String, required: true },
    bugs: { type: String, required: true },
    overallSuggestions: { type: String, required: true },
  },
  { timestamps: true }
);

const AIReviewResponseModel = mongoose.models.AIReviewResponse || mongoose.model<IAIReviewResponse>("AIReviewResponse", AIReviewResponseSchema);
export default AIReviewResponseModel;