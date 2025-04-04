import crypto from "crypto";
import { ILogin, IUser } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import EmailService from "./email.service";
import { createToken } from "@/lib/storeGetDelete";
import { emailTemplate } from "@/lib/emailTemplate";
import authRepo from "../repositories/auth.repo";


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
    const hashedPassword = await hashPassword(data.password);
    await UserRepository.AddDeveloper(data, hashedPassword);
  }

  
  async ForgetPassword(email: string) {
    console.log(email);
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    const resetToken = user.getVerificationToken();
    await user.save();
    const ResetLink = `/reset-password?resetToken=${resetToken}&id=${user?._id}`;
    const message = emailTemplate({link:ResetLink, title: "", description: "", secondary: "", button: "Reset Password" });
    // Send verification email
    await EmailService.sendEmail(user?.email, "Reset Password", message);
}

async ResetPassword(password: string, resetToken: string, userId: string) {
    const verifyToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await UserRepository.findUserByVerificationToken(userId, verifyToken);
    if (!user) {
        throw new Error("user not found, token not found, or token expired")
    }
    const hashedPassword: string = await hashPassword(password);
    try{
        await authRepo.resetPassword(user, hashedPassword);
    }catch(error){
        
    }
}
}

export default new AuthService();