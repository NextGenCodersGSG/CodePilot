import userModel, { IUserDocument } from "@/DB/models/user.model";
import { Role } from "@/@types/index";

export class UserRepository {
    async findUserById(id: string, role: Role): Promise<IUserDocument | null> {
        return await userModel.findOne({ _id: id, role });
    }

    async findAllUsers() {
        return await userModel.find({});
    }

    async findAllDevelopers() {
        return await userModel.find({role: Role.Developer}).select('_id name');
    }
    
    async updateUserPlan(userId: string, plan: string): Promise<IUserDocument | null> {
        console.log(`Attempting to update user ${userId} with plan ${plan}`);
        const result = await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { plan: plan } },
            { new: true, runValidators: true }
        );
        console.log("Update result:", result);
        return result;
    }
}

export default new UserRepository();