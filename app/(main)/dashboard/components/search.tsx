import { IUser } from '@/@types';
import { IUserDocument } from '@/DB/models/user.model';
import { useState, useEffect } from 'react';

interface UserSearchProps {
    users: IUserDocument[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<IUserDocument[]>(users); 

    useEffect(() => {
        const results = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    return (
        <div className="flex flex-col mb-6">
            <input
                type="text"
                placeholder="Search by name or email"
                className="bg-[#001A2C] border-[#002945] text-[#F2F2F2] placeholder:text-[#B3B3B3] p-2 rounded mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="min-w-full bg-[#001A2C] border border-[#002945]">
                <thead>
                    <tr className="bg-[#002945] text-[#F2F2F2]">
                        <th className="border border-[#002945] px-4 py-2">ID</th>
                        <th className="border border-[#002945] px-4 py-2">Name</th>
                        <th className="border border-[#002945] px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.id} className="text-[#F2F2F2]">
                                <td className="border border-[#002945] px-4 py-2">{user.id}</td>
                                <td className="border border-[#002945] px-4 py-2">{user.name}</td>
                                <td className="border border-[#002945] px-4 py-2">{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="border border-[#002945] px-4 py-2 text-center text-[#B3B3B3]">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserSearch;