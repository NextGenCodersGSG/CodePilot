import CodeReviewRepo from "../repositories/reviews.repo";

class CodeReviewService {

    async findAll() {
        return await CodeReviewRepo.getAllReviews();
    }
}

export default new CodeReviewService();