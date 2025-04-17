import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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
    <Button
      className="transition duration-100 text-white px-4 py-2 hover:bg-secondary cursor-pointer border border-border "
      onClick={handleLogout}>Log out
    </Button>
  );
};
export default AdminDropdown;