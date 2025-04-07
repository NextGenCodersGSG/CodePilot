import { ICodeReview } from "@/@types";
import codeReviewModel from "@/DB/models/code-review.model";

export class CodeReviewRepo {
    async getAllReviews(): Promise<ICodeReview[]> {
        return await codeReviewModel.find();
    }
}
export default new CodeReviewRepo();