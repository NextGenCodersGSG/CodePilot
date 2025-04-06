import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/DB/connection";
import CountLogs from "@/DB/models/count-logs.model";

export async function GET(req: NextRequest) {
  await connection();
  try {
    const recentUsers = await CountLogs.find().sort({ counter: -1 }).limit(10); // Get recent users

    return NextResponse.json({ recentUsers });
  } catch (error) {
    console.error("Error fetching count logs:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}
