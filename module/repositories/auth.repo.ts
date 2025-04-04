import userModel, { IUserDocument } from "@/DB/models/user.model";
import { IUser } from "@/@types/index";

export class AuthRepository {

  async findUserByEmail(email: string): Promise<IUserDocument | null> {
    return await userModel.findOne({ email });
  }

  async AddDeveloper(data: IUser){
    const developer = await userModel.create({...data});
    return developer;
  }

}
export default new AuthRepository();