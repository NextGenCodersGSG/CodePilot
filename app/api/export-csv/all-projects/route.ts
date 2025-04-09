import { NextResponse } from "next/server";
import ProjectsService from "@/module/services/projects.service";
import { connection } from "@/DB/connection";
import { generateCsv } from "@/lib/csvExports";

export async function GET() {
    try {
        await connection();
        const projects = await ProjectsService.findAll();

        if (!projects.length) {
            return NextResponse.json({ error: "No projects Found" }, { status: 400 });
        }

        // Generate CSV data
        const csv = generateCsv(projects);

        // Return CSV as a file
        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": 'attachment; filename="projects.csv"',
            },
        });
    } catch (error) {
        console.error("CSV Export Error:", error);
        return NextResponse.json({ error: "Failed to export projects" }, { status: 500 });
    }
}