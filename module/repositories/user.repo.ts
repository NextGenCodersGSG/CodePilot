import userModel, { IUserDocument } from "@/DB/models/user.model";
import { Role } from "@/@types/index";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import { ObjectId } from 'mongodb';

export class UserRepository {
  async findUserById(id: string, role: Role): Promise<IUserDocument | null> {
    return await userModel.findOne({ _id: id, role });
  }

  async findAllUsers() {
    return await userModel.find({});
  }

  async findAllDevelopers() {
    return await userModel.find({ role: Role.Developer }).select("_id name");
  }

  async updateUserPlan(
    userId: string,
    plan: string
  ): Promise<IUserDocument | null> {
    const result = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { plan: plan } },
      { new: true, runValidators: true }
    );
    return result;
  }
  
  async updateUserProfile(userId: string, updateData: Partial<IUserDocument>) {
    return userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    // Verify old password
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) throw new Error("Invalid current password");

    // Hash new password and update
    user.password = await hashPassword(newPassword);
    await user.save();
  }

  async deleteUser(userId: string): Promise<IUserDocument | null> {
    return userModel.findByIdAndDelete(userId);
  }
}

export default new UserRepository();
