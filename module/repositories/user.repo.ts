import mongoose from "mongoose";
import userModel, { IUserDocument } from "@/DB/models/user.model";
import { Role } from "@/@types/index";

export class UserRepository {
    async findAdminById(id: mongoose.Types.ObjectId): Promise<IUserDocument | null> {
        return await userModel.findOne({ _id: id, role: Role.Admin });
    }
    async findAllUsers() {
        return await userModel.find({});
    }
}
export default new UserRepository();