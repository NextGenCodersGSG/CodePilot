import userModel, { IUserDocument } from "@/DB/models/user.model";
import { Role } from "@/@types/index";

export class UserRepository {
    async findAdminById(id: string): Promise<IUserDocument | null> {
        return await userModel.findOne({ _id: id, role: Role.Admin });
    }
    async findAllUsers() {
        return await userModel.find({});
    }
    async findAllDevelopers() {
        return await userModel.find({role: Role.Developer});
    }
}
export default new UserRepository();