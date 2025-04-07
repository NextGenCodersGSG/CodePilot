import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function TotalUsers() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    //fetch total of user
    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await fetch('/api/users/total'); 
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data); // Log the data fetched
                setTotalUsers(data.total); // Access the total value from the response
                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                setError('Error fetching user count');
                setLoading(false); // Set loading to false even if there is an error
                console.error('Error fetching user count:', error);
            }
        };
    
        fetchUserCount();
    }, []);
    return (
        <Card className="bg-[#001523] border-[#002945]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#B3B3B3]">Total Users</CardTitle>
                <Users className="h-4 w-4 text-[#00406C]" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-2xl font-bold">Loading...</div>
                ) : error ? (
                    <div className="text-red-600 font-bold">{error}</div> 
                ) : (
                    <div className="text-2xl font-bold">{totalUsers}</div>
                )}
            </CardContent>
        </Card>
    )
}
