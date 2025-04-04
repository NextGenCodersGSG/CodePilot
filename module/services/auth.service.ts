import { ILogin } from "@/@types";
import AuthRepository from "../repositories/auth.repo";
import { comparePassword } from "@/lib/hashAndCompare";
import { createToken } from "@/lib/storeGetDelete";


class AuthService {
  async signIn(data: ILogin) {
    console.log("SignIn attempt with email:", data.email); // Log incoming email

    const user = await AuthRepository.findUserByEmail(data.email);
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
    await UserRepository.AddDeveloper(data);
  }
}

export default new AuthService();
