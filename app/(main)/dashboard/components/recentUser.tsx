"use client";

import { ICountLogs } from '@/DB/models/count-logs.model';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ActiveUserDisplayProps{
  recentUsers:ICountLogs[];
}
const ActiveUserDisplay = ({ recentUsers }: ActiveUserDisplayProps) => {
  const [selectedTab, setSelectedTab] = useState("overview");



  const deleteUser = async (userId: string) => {
    const response = await fetch(`/api/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  const handleDeleteUser = async (user: ICountLogs) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user "${user.name}"?`);

    if (confirmDelete) {
      try {
        const response = await deleteUser(user.id);

        if (response.ok) {
          alert('User deleted successfully.');
        } else {
          const contentType = response.headers.get('Content-Type');
          let errorMessage = `Failed to delete user. Status: ${response.status}`;

          if (contentType && contentType.includes('application/json')) {
            const errorResponse = await response.json();
            errorMessage = errorResponse?.message || 'An unknown error occurred.';
          }

          throw new Error(errorMessage);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(`An error occurred: ${error.message}`);
        } else {
          alert('An unknown error occurred.');
        }
      }
    }
  };


  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-[#001523] border-[#002945]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription className="text-[#B3B3B3]">
              Recent users and their activity on the platform
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2]"

            onClick={() => setSelectedTab("analytics")
              
            }
            >
            View All Users
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#002945]">
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Icon</th>
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Email</th>
                  <th className="px-4 py-3 text-right font-medium text-[#B3B3B3]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user._id as string}
                    className="border-b border-[#002945] hover:bg-[#001A2C] transition-colors"
                  >
                    <td>
                      <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
                        <span className="font-medium text-xs">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-xs text-[#B3B3B3]">{user.email}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#B3B3B3] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#001523] border-[#002945] text-[#F2F2F2]">
                          <DropdownMenuItem
                            className="hover:bg-[#001A2C] cursor-pointer text-red-500"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActiveUserDisplay;