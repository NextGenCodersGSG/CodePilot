import { ILogin } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { generateToken } from "@/lib/generateAndVerify";
import { comparePassword } from "@/lib/hashAndCompare";

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
}

export default new AuthService();
