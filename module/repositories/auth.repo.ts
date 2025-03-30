import { IUser } from "@/@types";
import userModel, { IUserDocument } from "@/DB/models/user.model";

export class UserRepository {

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return await userModel.findOne({ email });
  }
  async createUser(user: IUser): Promise<IUserDocument | null> {
    return await userModel.create(user);
  }
}
export default new UserRepository();
