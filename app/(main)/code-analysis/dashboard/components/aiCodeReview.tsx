import { useEffect, useState } from 'react';
import { FileCode } from 'lucide-react'; // Ensure the icon import is correct
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIReviewDashboard = () => {
    const [totalAIReviews, setTotalAIReviews] = useState(0);
    const [loading, setLoading] = useState(true);
    const [percentageChange, setPercentageChange] = useState("+0%"); // Initialize percentage change

    const fetchTotalAIReviews = async () => {
        try {
            const response = await fetch('/api/reviews'); 
            if (!response.ok) {
                throw new Error('Failed to fetch total AI reviews');
            }
            const data = await response.json();
            console.log("Total AI Reviews:", data.totalAIReviews); 
            setTotalAIReviews(data.totalAIReviews); 
            setPercentageChange("+24%"); 
        } catch (error) {
            console.error("Error fetching total AI reviews:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchTotalAIReviews(); 
    }, []); 

    return (
        <Card className="bg-[#001523] border-[#002945]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#B3B3B3]">AI Code Reviews</CardTitle>
                <FileCode className="h-4 w-4 text-[#00406C]" />
            </CardHeader>
            <CardContent>
                {loading ? ( // Show loading indicator
                    <div className="text-2xl font-bold">Loading...</div>
                ) : (
                    <div className="text-2xl font-bold">{totalAIReviews}</div> // Render total reviews
                )}
                <p className="text-xs text-[#B3B3B3] mt-1">
                    <span className="text-green-500">{percentageChange}</span> from last week
                </p>
            </CardContent>
        </Card>
    );
};

export default AIReviewDashboard;