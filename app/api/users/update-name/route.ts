// app/api/users/update-name/route.ts

import userService from "@/module/services/user.service";
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

    // Return both user data and new token
    return NextResponse.json(
      {
        user: {
          email: updatedUser.email,
          name: updatedUser.name as string,
          userId: updatedUser._id.toString(),
          plan: updatedUser.plan,
          userRole: updatedUser.role,
          exp: Math.floor(Date.now() / 1000) + 86400, // Example expiration
          iat: Math.floor(Date.now() / 1000),
          avatar: "/profile.jpg"
        }
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(
      "Update failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}
