"use client";

import { ICountLogs } from '@/DB/models/count-logs.model';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2, AlertTriangle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ActiveUserDisplayProps {
  recentUsers: ICountLogs[];
}

  const INITIAL_USER = { 
  id: "",
  name: "",
  email: ""
}

const ActiveUserDisplay = ({ recentUsers }: ActiveUserDisplayProps) => {
  const [_, setSelectedTab] = useState("overview");
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    user: { 
      id:  string,
      name: string,
      email: string
    };
    isDeleting: boolean;
  }>({
    isOpen: false,
    user: INITIAL_USER,
    isDeleting: false
  });

  useEffect(() => {
    if (recentUsers.some(user => !user?._id)) {
      console.warn("Invalid user data detected in recentUsers");
    }
  }, [recentUsers]);

  const deleteUser = async (userId: string) => {
    console.log("Deleting user with ID:", userId);
    const response = await fetch(`/api/delete-user`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return response;
  };

  const handleDeleteUser = (user: ICountLogs) => {
    if (!user?._id) {
      toast.error("Invalid user data");
      return;
    }
    
    setDeleteConfirmation({
      isOpen: true,
      user: { 
        id: user._id as string,
        name: user.name,
        email: user.email
      },
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.user) return;
    
    setDeleteConfirmation(prev => ({ ...prev, isDeleting: true }));
    try {
      const response = await deleteUser(deleteConfirmation.user.id);

      if (response.ok) {
        toast.success(`User "${deleteConfirmation.user.name}" deleted successfully`);
        // Close the confirmation dialog
        setDeleteConfirmation({ isOpen: false, user: INITIAL_USER , isDeleting: false });
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
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.")
      }
      setDeleteConfirmation(prev => ({ ...prev, isDeleting: false }));
    }
  };

  useEffect(()=> {

  },[])

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, user: INITIAL_USER, isDeleting: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative"
    >
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation.isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={cancelDelete}
            />
            
            {/* Modal dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y:60 }}
              animate={{ opacity: 1, scale: 1, y: 0}}
              exit={{ opacity: 0, scale: 0.95, y: -60 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#001523] border-[#002945] border rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  <h3 className="text-lg font-medium text-[#F2F2F2]">Confirm Deletion</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-[#001A2C] cursor-pointer"
                  onClick={cancelDelete}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="py-4">
                <p className="text-[#B3B3B3]">
                  Are you sure you want to delete user <span className="font-semibold text-[#F2F2F2]">{deleteConfirmation.user?.name}</span>?
                </p>
                <p className="text-[#B3B3B3] text-sm mt-2">
                  This action cannot be undone. All data associated with this user will be permanently removed.
                </p>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <Button
                  variant="outline"
                  className="border-[#002945] hover:bg-[#001A2C] hover:text-[#F2F2F2] cursor-pointer"
                  onClick={cancelDelete}
                  disabled={deleteConfirmation.isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  onClick={confirmDelete}
                  disabled={deleteConfirmation.isDeleting}
                >
                  {deleteConfirmation.isDeleting ? 'Deleting...' : 'Delete User'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <Card className="bg-[#001523] border-[#002945] space-y-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription className="text-[#B3B3B3]">
              Recent users and their activity on the platform
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#002945]">
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Icon</th>
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Email</th>
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