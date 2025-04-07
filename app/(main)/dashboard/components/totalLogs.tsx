import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const UserLogs = () => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [activeUsers, setActiveUsers] = useState<number>(0); 

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); 

        setActiveUsers(data.activeUsers); 
      } catch (error) {
        console.error('Error fetching user count:', error);
        setError("Error fetching user logs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserLogs();
  }, []);

  return (
    <Card className="bg-[#001523] border-[#002945]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[#B3B3B3]">Active Users</CardTitle>
        <UserCheck className="h-4 w-4 text-[#00406C]" />
      </CardHeader>
      <CardContent>
        {loading ? ( 
          <div className="text-2xl font-bold">Loading...</div>
        ) : error ? (
          <div className="text-red-600 font-bold">{error}</div> // Display error message
        ) : (
          <div className="text-2xl font-bold">{activeUsers}</div> // Render active user count
        )}
      </CardContent>
    </Card>
  );
};

export default UserLogs;