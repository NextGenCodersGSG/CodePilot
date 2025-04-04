import { NextResponse } from "next/server";
import userService from "@/module/services/user.service";
import { connection } from "@/DB/connection";
import { generateCsv } from "@/lib/csvExports";

export async function GET() {
    try {
        await connection();
        const users = await userService.findAll();

        if (!users.length) {
            return NextResponse.json({ error: "No Users Found" }, { status: 400 });
        }

        // Generate CSV data
        const csv = generateCsv(users);

        // Return CSV as a file
        return new Response(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="users.csv"',
            },
        });
    } catch (error) {
        console.error("CSV Export Error:", error);
        return NextResponse.json({ error: "Failed to export users" }, { status: 500 });
    }
}