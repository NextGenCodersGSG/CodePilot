import xss from "xss";
import { ILogin, IUser, Role } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { generateToken } from "@/lib/generateAndVerify";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";
import { connection } from "@/DB/connection";


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

    const token: string = await generateToken({
      userId: user.id,
      userRole: user.role,
    });

    console.log("Token generated:", token);

    return { token, user };
  }
  async signUp(data: IUser) {
    const validateUser = await validationSchema.validate(data);
    if(!validateUser) {
      throw new Error("Invalid data");
    }
    const hashedPass = await hashPassword(data.password);
    const userData = {
      name: xss(data.name),
      email: xss(data.email),
      password: hashedPass,
      role: Role.User,
    };
    await connection();
    const newUser = await UserRepository.createUser(userData);
    if (!newUser) {
      throw new Error("Something went wrong, please try again later");
    }
    return newUser;
  }
}

export default new AuthService();
