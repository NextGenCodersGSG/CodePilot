import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { connection } from "@/DB/connection";


export async function POST(req: NextRequest) {
    await connection();
    try {
        const {email} = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        await AuthService.ForgetPassword(email);
        return NextResponse.json(
            {
                message: "Email Sent successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
