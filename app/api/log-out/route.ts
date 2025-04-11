import AuthService from "@/module/services/auth.service"
import { NextResponse } from "next/server";

export const POST = async() => {
    try {
        const logout = await AuthService.logout();
        return NextResponse.json({message: logout}, {status: 200})
    }
    catch (error) {
        if(error instanceof Error)
        return NextResponse.json({message: error.message}, {status: 500})
        else
        return NextResponse.json({message: "Unexpected Error happend!"}, {status: 500})
    }
}