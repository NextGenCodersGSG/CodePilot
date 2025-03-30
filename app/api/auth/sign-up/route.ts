import {  IUser } from "@/@types";
import authService from "@/module/services/auth.service";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    console.log(process.env.MONGODB_URI)
    const data: IUser = await request.json();
    if(!data) {
        return NextResponse.json({error: "Data is required"}, {status: 400});
    }
    try {
        const  newUser = await authService.signUp(data);
        return NextResponse.json(newUser, {status: 201} );
    }
    catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({error: error.message}, {status: 400});
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
    
}