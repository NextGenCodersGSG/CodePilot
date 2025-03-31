// services/auth.service.ts

import { IUserLoginData } from "@/app/(auth)/sign-in/components/test-components/type";
import CountLogs from "@/DB/models/count-logs.model";

// Function to handle user login
export const userLogin = async ({ userId, name, email }: IUserLoginData) => {
    // Check if user already exists in CountLogs
    let userLog = await CountLogs.findOne({ userId });

    if (!userLog) {
        // If user doesn't exist, create a new record
        userLog = new CountLogs({ userId, name, email, counter: 1 });
    } else {
        // Ensure counter is treated as a primitive number
        userLog.counter = (userLog.counter as number) + 1; // Increment the counter
    }

    await userLog.save(); // Save the changes to the database
    return userLog; // Return the updated user log
};

// Function to handle user logout
export const userLogout = async (userId: string) => {
    const userLog = await CountLogs.findOne({ userId });

    if (userLog) {
        userLog.counter = Math.max(0, (userLog.counter as number) - 1);
        await userLog.save(); // Save the changes to the database
    }
};