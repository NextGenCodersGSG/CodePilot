import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { ILogin } from "@/@types/index";
import { connection } from "@/DB/connection";
import CountLogs from "@/DB/models/count-logs.model"; // Importing CountLogs model
import mongoose from "mongoose"; // Import mongoose for type checks

export async function POST(req: NextRequest) {
    await connection(); // Make sure to establish the database connection
    try {
        const data: ILogin = await req.json();

        if (!data) {
            return NextResponse.json({ error: "Data is required" }, { status: 400 });
        }
        
        // Authenticate user
        const { token, user } = await AuthService.signIn(data);
        const role: string = user.role;

        // Count log logic
        const existingLog = await CountLogs.findOne({ userId: user._id });

        if (existingLog) {
            existingLog.counter += 1; 
            await existingLog.save();
        } else {
            const logEntry = new CountLogs({
                userId: user._id, 
                name: user.name,
                email: user.email,
                counter: 1,
            });

            await logEntry.save(); 
        }

        return NextResponse.json(
            {
                message: "User login successfully",
                token,
                role
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signin error:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}