"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal, Trash2, AlertTriangle, X } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IUserDocument } from "@/DB/models/user.model";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface UserManagementCardProps {
  users: IUserDocument[]; 
}

const UserManagementCard = ({ users: initialUsers }: UserManagementCardProps) => {
  const [users, setUsers] = useState<IUserDocument[]>(initialUsers); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [filteredUsers, setFilteredUsers] = useState<IUserDocument[]>(initialUsers);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    user: IUserDocument | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    user: null,
    isDeleting: false
  });

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const deleteUser = async (userId: string) => {
    const response = await fetch(`/api/delete-user`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return response;
  };

  const handleDeleteUser = async (user: IUserDocument) => {
    // Open confirmation dialog with the selected user
    setDeleteConfirmation({
      isOpen: true,
      user,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.user?._id) return;
    
    try {
      setDeleteConfirmation(prev => ({ ...prev, isDeleting: true }));
      const response = await deleteUser(deleteConfirmation.user._id);
      const result = await response.json();

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== result.deletedId));
        toast.success(`User "${deleteConfirmation.user?.name}" deleted successfully`);
        // Close the confirmation dialog
        setDeleteConfirmation({ isOpen: false, user: null, isDeleting: false });
      } else {
        throw new Error(result.message || "Failed to delete user");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      setDeleteConfirmation(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, user: null, isDeleting: false });
  };

  return (
    <TabsContent value="users" className="space-y-6">
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation.isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background z-40 min-h-screen"
              onClick={cancelDelete}
            />
            
            {/* Modal dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y:60 }}
              animate={{ opacity: 1, scale: 1, y: 0}}
              exit={{ opacity: 0, scale: 0.95, y: -60 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-popover border-accent border rounded-lg shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                  <h3 className="text-lg font-medium text-foreground">Confirm Deletion</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  onClick={cancelDelete}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="py-4">
                <p className="text-muted-foreground">
                  Are you sure you want to delete user <span className="font-semibold text-foreground">{deleteConfirmation.user?.name}</span>?
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  This action cannot be undone. All data associated with this user will be permanently removed.
                </p>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <Button
                  variant="outline"
                  className="border-accent hover:bg-sidebar-accent hover:text-foreground"
                  onClick={cancelDelete}
                  disabled={deleteConfirmation.isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
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

      <Card className="bg-sidebar border-accent">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage user accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-sidebar-accent border-collapse">
              <thead>
                <tr className="border-b border-accent">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Signup Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Last Active</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-accent hover:bg-sidebar-accent transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <span className="font-medium text-xs text-white">
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-sidebar border-accent text-foreground"
                          >
                            <DropdownMenuItem
                              className="hover:bg-sidebar-accent cursor-pointer text-red-500"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted-foreground">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UserManagementCard;