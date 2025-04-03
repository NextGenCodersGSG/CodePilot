import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TotalUserCard = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('/api/userLogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch total users');
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers);
            } catch (error) {
                console.error('Error fetching total users:', error);
            } finally {
                setLoading(false); // Setting loading to false after fetching is done
            }
        };

        fetchTotalUsers();
    }, []);

    return (
        <Card className="bg-[#001523] border-[#002945]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#B3B3B3]">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-[#00406C]" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mb-4">
                        <div className="text-2xl font-bold">{totalUsers}</div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TotalUserCard;