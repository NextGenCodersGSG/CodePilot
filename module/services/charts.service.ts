import { IChartData, ICodeReview, IUser, IUserFromDB } from "@/@types";
import CodeReviewRepo  from "@/module/repositories/reviews.repo";
import { convertToChartData } from "@/lib/convertToChartData";
import dayFromISO from "@/lib/getDayFromISO";
import  UserRepository  from "../repositories/user.repo";

class ChartsService {
    async getReviewsData() {
        const reviews: ICodeReview[] = await CodeReviewRepo.getAllReviews();
        const reviewsPerDay:{ [key: string]: number }= {};
    
        reviews.forEach((review) => {
            const day = dayFromISO(review.createdAt);
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