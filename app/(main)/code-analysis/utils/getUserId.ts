export const getUserId = async () => {
    try {
      const response = await fetch("/api/auth/token");
      const user = await response.json();
      
      const userId = user.token.userId as string;
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  }