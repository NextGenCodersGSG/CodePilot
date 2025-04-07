import { connection } from "@/DB/connection";
import { NextRequest, NextResponse } from "next/server";
import projectModel from "@/DB/models/projects.model";

export async function GET(req: NextRequest) {
  await connection();
<<<<<<< HEAD
  
  try {

    const projects = await projectModel.find({});
=======
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({
        error: "User ID is required",
      }, { status: 400 });
    }

      const projects = await projectModel.find({userId: userId});
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
    
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