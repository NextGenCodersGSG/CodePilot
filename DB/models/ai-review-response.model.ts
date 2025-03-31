import { IAIReviewResponse } from "@/@types";
import mongoose, { Schema, Document } from "mongoose";

export interface IAIReviewResponseDocument extends Document, IAIReviewResponse {}

const AIReviewResponseSchema = new Schema<IAIReviewResponseDocument>(
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

const AIReviewResponseModel =
  mongoose.models.AIReviewResponse ||
  mongoose.model<IAIReviewResponseDocument>(
    "AIReviewResponse",
    AIReviewResponseSchema
  );
export default AIReviewResponseModel;
