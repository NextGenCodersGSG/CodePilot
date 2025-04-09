import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminDropdown = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/log-out', { method: 'POST' });

      if (response.ok) {
        // Perform logout actions
        router.push('/sign-in'); // Use router from next/navigation
      } else {
        // Handle error
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
    className="w-full p-0 ml-1 h-fit flex gap-2 justify-start  m-0 text-sm bg-transparent hover:bg-transparent cursor-pointer border"
     onClick={handleLogout}>Log out</button>
  );
};
export default AdminDropdown;