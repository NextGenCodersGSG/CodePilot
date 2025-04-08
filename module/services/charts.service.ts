import { IChartData, ICodeReview, IUserFromDB } from "@/@types";
import CodeReviewRepo  from "@/module/repositories/reviews.repo";
import getDayFromISO from "@/lib/getDayFromISO";
import { convertToChartData } from "@/lib/convertToChartData";
class ChartsService {
    async getReviewsData() {
        const reviews: ICodeReview[] = await CodeReviewRepo.getAllReviews();
        const reviewsPerDay:{ [key: string]: number }= {};
    
        reviews.forEach((review) => {
            const day = getDayFromISO(review.createdAt);
            reviewsPerDay[day] = (reviewsPerDay[day] || 0) + 1;
        });
        const chartData: IChartData[] =  convertToChartData(reviewsPerDay, "reviews");
        return chartData;
    }

}
export default new ChartsService();