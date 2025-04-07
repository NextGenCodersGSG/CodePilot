import { ICodeReview } from "@/@types";
import { connection } from "@/DB/connection";
import CodeReviewRepo  from "@/module/repositories/reviews.repo";
interface IReviewPerDay {
    name: string,
    reviewes: number,
}
const dayFromISO = (isoDate: Date): string => {
    const date = new Date(isoDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return dayName;
} 

export const getReviewsPerDay = async (): Promise<IReviewPerDay[]> => {
    await connection();
    const reviews: ICodeReview[] = await CodeReviewRepo.getAllReviews();
    const reviewsPerDay:{ [key: string]: number }= {};

    reviews.forEach((review) => {
        const day = dayFromISO(review.createdAt);
        reviewsPerDay[day] = (reviewsPerDay[day] || 0) + 1;
    });

    const dataToChart: IReviewPerDay[] = Object.keys(reviewsPerDay).map((day) => ({
        name: day,
        reviewes: reviewsPerDay[day],
    }));

    return dataToChart;
}
