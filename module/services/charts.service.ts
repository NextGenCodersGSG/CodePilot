import { IChartData, ICodeReview, IUser } from "@/@types";
import CodeReviewRepo  from "@/module/repositories/reviews.repo";
import getDayFromISO from "@/lib/getDayFromISO";
import { convertToChartData } from "@/lib/convertToChartData";
import  UserRepository  from "../repositories/user.repo";
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
    async getUsersRolesData() {
        const users: IUser[] = await UserRepository.findAllUsers();
        const usersRoles: { [key: string]: number }= {};
        users.map((user) => {
            usersRoles[user.role] = (usersRoles[user.role] || 0) + 1;
        });
        const chartData: IChartData[] = convertToChartData(usersRoles, "value");
        return chartData;
    }
}
export default new ChartsService();