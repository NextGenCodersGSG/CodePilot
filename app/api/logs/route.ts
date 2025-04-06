import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/DB/connection";
import CountLogs from "@/DB/models/count-logs.model";

export async function GET(req: NextRequest) {
  await connection();
  try {
    console.log("befor conect to active user ");
    await connection();
    console.log("after conect to active user ");
    const activeUsers = await CountLogs.countDocuments();
    return NextResponse.json({ activeUsers });
  } catch (error) {
    console.error("Error fetching count logs:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}