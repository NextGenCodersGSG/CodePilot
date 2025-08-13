import { connection } from "@/DB/connection";
import { NextResponse } from "next/server";
import projectModel from "@/DB/models/projects.model";

export async function GET() {
  await connection();

  try {
    const projects = await projectModel.find({});

    let bugsCount = 0;
    let performanceIssuesCount = 0;
    let securityIssuesCount = 0;

    projects.forEach((project) => {
      bugsCount += project.bugs.length;
      performanceIssuesCount += project.performance_issues.length;
      securityIssuesCount += project.security_issues.length;
    });

    return NextResponse.json(
      {
        success: true,
        metrics: {
          bugsCount,
          performanceIssuesCount,
          securityIssuesCount,
          totalIssues: bugsCount + performanceIssuesCount + securityIssuesCount
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
