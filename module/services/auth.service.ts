import { ILogin, IUser } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import { createToken } from "@/lib/storeGetDelete";


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

  async AddDeveloper(data: IUser){
    const existingUser = await UserRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const hashedPassword: string = await hashPassword(data.password);
    await UserRepository.AddDeveloper(data, hashedPassword);
  }
}

export default new AuthService();