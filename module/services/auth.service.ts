import xss from "xss";
import { ILogin, IUser, Role } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import { createToken} from "@/lib/storeGetDelete";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";


class AuthService {
  async signIn(data: ILogin) {
    console.log("SignIn attempt with email:", data.email); // Log incoming email

    const user = await UserRepository.findUserByEmail(data.email);
    if (!user) {
      console.log("User not found for email:", data.email);
      throw new Error("Invalid credentials");
    }

    console.log("User found:", user.id, "Role:", user.role);

    const isMatch: boolean = await comparePassword(
      data.password,
      user.password
    );

    if (!isMatch) {
      console.log("Password does not match for user:", user.id);
      throw new Error("Invalid credentials");
    }

    console.log("Password matched, generating token...");
    const token = await createToken(user.id,user.role);

    console.log("Token generated:", token);

    return { token, user };
  }
  async signUp(data: IUser) {
    const validateUser = await validationSchema.validate(data);
    const exist = await UserRepository.findUserByEmail(data.email);
    if(exist) {
      throw new Error(`You Already have an account with email: ${data.email}`  )
    }
    if(!validateUser) {
      throw new Error("Invalid data");
    }
    const hashedPass = await hashPassword(data.password);
    const userData: IUser = {
      name: xss(data.name),
      email: xss(data.email),
      password: hashedPass,
      role: Role.User,
    };
    const newUser = await UserRepository.createUser(userData);
    if (!newUser) {
      throw new Error("Something went wrong, please try again later");
    }
    return newUser;
  }
}

export default new AuthService();

