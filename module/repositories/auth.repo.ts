import { IUser } from "@/@types";
import userModel, { IUserDocument } from "@/DB/models/user.model";

export class AuthRepository {

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return await userModel.findOne({ email });
  }

  async AddDeveloper(data: IUser, password: string){
    const developer = await userModel.create({...data, password});
    return developer;
  }

  async findUserByVerificationToken(userId: string, verifyToken: string): Promise<IUserDocument | null> {
    return await userModel.findOne({
        _id: userId,
        verifyToken,
        verifyTokenExpire: { $gt: new Date() },
    });
}

  async resetPassword(user: any, password: string){
    user.password = password;
    return await user.save();
}

async createUser(user: IUser): Promise<IUserDocument | null> {
  return await userModel.create(user);
}
}
export default new AuthRepository();
