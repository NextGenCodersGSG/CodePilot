// app/api/users/update-name/route.ts

import userService from "@/module/services/user.service";
import { createToken } from "@/lib/storeGetDelete"; // Import token creation
import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/DB/connection";

export async function POST(request: NextRequest) {
  try {
    await connection();

    const body = await request.json();
    const { userId, newName } = body;

    if (!userId || !newName) {
      return NextResponse.json(
        { error: "User ID and new name are required" },
        { status: 400 }
      );
    }

    // Update user name
    const updatedUser = await userService.updateUserName(userId, newName);

    // Create new token with updated data
    const newToken = await createToken(
      updatedUser._id.toString(),
      updatedUser.name, // This now has the new name
      updatedUser.email,
      updatedUser.role,
      updatedUser.plan
    );

    // Return both user data and new token
    return NextResponse.json(
      { 
        message: "Name updated successfully",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          plan: updatedUser.plan
        },
        newToken // Include new token in response
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Update failed:", error.message);
    return NextResponse.json(
      { error: error.message || "Update failed" },
      { status: error.status || 500 }
    );
  }
}