import { ILogin } from "@/@types";
import UserRepository from "../repositories/auth.repo";
import { comparePassword } from "@/lib/hashAndCompare";
import { createToken } from "@/lib/storeGetDelete";
import CountLogs from "@/DB/models/count-logs.model";

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

  static async signOut(userId: string) {
    await CountLogs.findOneAndUpdate(
      { userId },
      { $inc: { counter: -1 } } // Decrease counter by 1
    );
  }
}

export default new AuthService();