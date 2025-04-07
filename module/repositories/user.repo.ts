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
}
export default new UserRepository();