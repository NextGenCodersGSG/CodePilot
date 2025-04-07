import { connection } from "@/DB/connection";
import { NextRequest, NextResponse } from "next/server";
import projectModel from "@/DB/models/projects.model";

export async function GET(req: NextRequest) {
  await connection();
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({
        error: "User ID is required",
      }, { status: 400 });
    }

      const projects = await projectModel.find({userId: userId});
    
    return NextResponse.json({ 
      success: true, 
      count: projects.length,
      data: projects 
    }, { status: 200 });
    
  } catch (error) {
    console.error(error);
    
    // Generic error response
    return NextResponse.json({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}