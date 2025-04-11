import { connection } from '@/DB/connection';
import projectModel from '@/DB/models/projects.model';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        console.log("befor connction to find projects ")
        await connection();
        console.log("after connction to find projects ")
        const totalProjects = await projectModel.countDocuments();
        console.log(totalProjects);
        return NextResponse.json({ totalProjects }, { status: 200 });
    } catch (error) {
        console.error("Error fetching total projects:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
