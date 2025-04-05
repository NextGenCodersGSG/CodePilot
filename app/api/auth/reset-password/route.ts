import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { connection } from "@/DB/connection";

export async function POST(req: NextRequest) {
    await connection();
    try {
        const { password, resetToken, userId } = await req.json();
        
        if (!password || !resetToken || !userId) {
            return NextResponse.json(
                { error: "Password, reset token and user ID are required" }, 
                { status: 400 }
            );
        }

        await AuthService.ResetPassword(password, resetToken, userId);
        
        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message }, 
                { status: 401 }
            );
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}