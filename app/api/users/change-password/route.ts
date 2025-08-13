import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connection();

    const body = await request.json();
    const { userId, currentPassword, newPassword } = body;

    // Validate required fields
    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Execute password change
    await userService.changePassword(userId, currentPassword, newPassword);

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Password change failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Password change failed" },
      { status: 400 }
    );
  }
}
