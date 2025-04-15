import userRepo from "../repositories/user.repo";

class UserService {
    async findAll() {
        return await userRepo.findAllUsers();
    }

    async getAllDevelopers() {
        return await userRepo.findAllDevelopers();
    }
    
    async updateUserPlan(userId: string, plan: string) {
        // Basic input validation
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid user ID");
        }
        
        if (!plan || typeof plan !== 'string') {
            throw new Error("Invalid plan");
        }
        
        // Define allowed plans - make this a constant or configuration value
        const allowedPlans = ["starter", "pro", "team"];
        
        // Check if the received plan is valid (case-insensitive)
        const normalizedPlan = plan.toLowerCase().trim();
        if (!allowedPlans.includes(normalizedPlan)) {
            console.error(`Invalid plan type: ${plan}. Allowed plans are: ${allowedPlans.join(', ')}`);
            throw new Error(`Invalid plan type: ${plan}. Allowed plans are: ${allowedPlans.join(', ')}`);
        }
        
        // Call repository method to update the user's plan
        return await userRepo.updateUserPlan(userId, normalizedPlan);
    }

    async updateUserName(userId: string, newName: string) {
        // Input validation
        if (!userId || typeof userId !== 'string') {
          throw new Error("Invalid user ID");
        }
        
        const trimmedName = newName.trim();
        if (!trimmedName || trimmedName.length < 3) {
          throw new Error("Name must be at least 3 characters");
        }
      
        // Update via repository
        const updatedUser = await userRepo.updateUserProfile(userId, { 
          name: trimmedName 
        });
      
        if (!updatedUser) {
          throw new Error("User not found");
        }
      
        return updatedUser;
      }

      async changePassword(
        userId: string,
        oldPassword: string,
        newPassword: string
      ): Promise<void> {
        // Input validation
        if (!userId || typeof userId !== "string") {
          throw new Error("Invalid user ID");
        }
    
        if (newPassword.length < 8) {
          throw new Error("New password must be at least 8 characters");
        }
    
        // Call repository method
        await userRepo.changePassword(userId, oldPassword, newPassword);
      }

      async deleteUser(userId: string): Promise<string> {
        // Validate input
        if (!userId || typeof userId !== 'string') {
          throw new Error('Invalid user ID');
        }
    
        // Delete user
        const deletedUser = await userRepo.deleteUser(userId);
        
        if (!deletedUser) {
          throw new Error('User not found');
        }
    
        return deletedUser._id.toString();
      }
}

export default new UserService();