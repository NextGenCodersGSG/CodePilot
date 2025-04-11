// app/api/users/update-plan/route.ts
import { connection } from "@/DB/connection";
import userService from "@/module/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connection();
  try {
    const body = await request.json();
    const { userId, plan } = body;

    if (!userId || !plan) {
      return NextResponse.json(
        { error: "User ID and plan are required" },
        { status: 400 }
      );
    }

    const updatedUser = await userService.updateUserPlan(userId, plan);

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User plan updated successfully",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          plan: updatedUser.plan // Ensure this is included
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating user plan:", error.message);
    return NextResponse.json(
      { error: "Failed to update user plan" },
      { status: 500 }
    );
  }
}
