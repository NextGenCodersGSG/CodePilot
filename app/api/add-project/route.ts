import { connection } from "@/DB/connection";
import { NextRequest, NextResponse } from "next/server";
import projectModel from "@/DB/models/projects.model";
import { validateProjectData } from "./utils/validateProjectData";

export async function POST(req: NextRequest) {
  await connection();
  
  try {
<<<<<<< HEAD

    const body = await req.json();
    
=======
    const body = await req.json();
>>>>>>> ea5d391babbc57689cdd76f23727f8f0c038863a
    const projectData = validateProjectData(body);
    const project = new projectModel(projectData);
    
    const result = await project.save();
    
    return NextResponse.json({ 
      success: true, 
      message: "Project analysis stored successfully", 
      data: result 
    }, { status: 201 });
    
  } catch (error) {
    console.error(error);
    
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json({ 
        error: "Validation Error", 
        details: error.message 
      }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


