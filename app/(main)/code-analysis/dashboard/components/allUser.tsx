import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TabsContent } from '@radix-ui/react-tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IUser } from '@/@types';
import { Button } from '@/components/ui/button';
import { connection } from '@/DB/connection';

const UserManagementCard = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]); // State for filtered users
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/allUser');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: IUser[] = await response.json();
                setUsers(data);
                setFilteredUsers(data); 
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Update filtered users based on search term
    useEffect(() => {
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const deleteUser = async (userId: string) => {
        const response = await fetch(`/api/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    };
    
    const handleDeleteUser = async (user: IUser) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the user "${user.name}"?`);
    
        if (confirmDelete) {
            try {
                const response = await deleteUser(user._id);

                if (response.ok) {
                    setUsers((prevUsers) => prevUsers.filter(u => u._id !== user._id));
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
        <TabsContent value="users" className="space-y-6">
            <Card className="bg-[#001523] border-[#002945]">
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription className="text-[#B3B3B3]">
                        Manage user accounts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Search Input */}
                    <Input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                        className="mb-4" // Add some margin below the input
                    />

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#001A2C] border-collapse">
                        <thead>
                                <tr className="border-b border-[#002945]">
                                    <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Name</th>
                                    <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Email</th>
                                    <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Signup Date</th>
                                    <th className="px-4 py-3 text-left font-medium text-[#B3B3B3]">Last Active</th>
                                    <th className="px-4 py-3 text-right font-medium text-[#B3B3B3]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-[#B3B3B3]">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="border-b border-[#002945] hover:bg-[#001A2C] transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
                                                        <span className="font-medium text-xs">
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-[#B3B3B3]">{user.email}</td>
                                            <td className="px-4 py-3 text-[#B3B3B3]">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-[#B3B3B3]">{new Date(user.updatedAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"   
                                                            size="icon"       
                                                            className="text-[#B3B3B3] hover:bg-[#001A2C] hover:text-[#F2F2F2]"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-[#001523] border-[#002945] text-[#F2F2F2]"
                                                    >
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-[#B3B3B3]">
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