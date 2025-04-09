import { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Assuming you're using Lucide icons

const AdminDropdown = ({ adminName = "Admin User" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // logout logic here
    // For example: clear localStorage, redirect to login page, etc.
    localStorage.clear();
    window.location.href = '/sign-in';
  };

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full bg-[#00406C] flex items-center justify-center">
          <span className="font-medium text-sm">
            {adminName.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:inline-block">{adminName}</span>
        <ChevronDown className="h-4 w-4 text-[#B3B3B3]" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDropdown;