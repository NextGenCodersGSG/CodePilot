import userModel, { IUserDocument } from "@/DB/models/user.model";

export class UserRepository {

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return await userModel.findOne({ email });
  }

}
export default new UserRepository();
