import userRepo from "../repositories/user.repo";

class UserService {
    async findAll() {
        return await userRepo.findAllUsers();
    }

    async getAllDevelopers() {
        return await userRepo.findAllDevelopers();
    }
    
    async updateUserPlan(userId: string, plan: string) {
        // Log for debugging
        console.log("Received plan update request:", { userId, plan });
        
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
}

export default new UserService();