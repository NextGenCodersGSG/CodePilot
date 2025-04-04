import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { IUser } from "@/@types/index";
import { connection } from "@/DB/connection";


export async function POST(req: NextRequest) {
    await connection();
    try {
        const data: IUser = await req.json();
        if (!data) {
            return NextResponse.json({ error: "Data is required" }, { status: 400 });
        }
        await AuthService.AddDeveloper(data);
        return NextResponse.json(
            {
                message: "Developer Added successfully",
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
