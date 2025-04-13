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
      className="transition duration-100 text-foreground px-4 py-2 rounded-2xl hover:bg-secondary cursor-pointer border border-border "
      onClick={handleLogout}>Log out
    
    </button>
  );
};
export default AdminDropdown;