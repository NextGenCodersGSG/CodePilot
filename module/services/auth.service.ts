import { ILogin, IUser, Role } from "@/@types";
import crypto from "crypto";
import xss from "xss";
import { ILogin, IUser, Role } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import CountLogs from "@/DB/models/count-logs.model";
import { generateToken } from "@/lib/generateAndVerify";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import { validationSchema } from "@/app/(auth)/sign-up/components/signup-form/validationSchema";
import { connection } from "@/DB/connection";
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

    const isMatch: boolean = await comparePassword(data.password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", user.id);
      throw new Error("Invalid credentials");
    }

    console.log("Password matched, generating token...");
    const token = await createToken(user.id, user.role);
    console.log("Token generated:", token);

    // Update or create a CountLogs entry for the user
    const countLogData = {
      userId: user.id, // User ID from the found user
      name: user.name, // User's name (ensure name is part of the user object)
      email: user.email, // User's email (ensure email is part of the user object)
      counter: 1, // Initialize counter to 1 for new login
    };

    // Increment the counter and create a new record if it doesn't exist
    await CountLogs.findOneAndUpdate(
      { userId: user.id }, // Find by userId
      { $inc: { counter: 1 }, $setOnInsert: countLogData }, // Increment counter, set other fields (like name and email) on insert
      { upsert: true } // Create new entry if it doesn't exist
    );

    return { token, user };
  }
  
  async signUp(data: IUser) {
    const validateUser = await validationSchema.validate(data);
    const exist = await UserRepository.findUserByEmail(data.email);
    if(exist) {
      throw new Error(`You Already have an account with email: ${data.email}`  )
    }

  static async signOut(userId: string) {
    await CountLogs.findOneAndUpdate(
      { userId },
      { $inc: { counter: -1 } } // Decrease counter by 1
    );
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