import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        ok: true,
    });
}

export async function POST(request: NextRequest) {
    const json = await request.json();

    const newProject = await prisma.project.create({
        data: {
            project: json.project,
            description: json.description,
        },
    });
    
    const newTask = await prisma.task.create({
        data: {
            task: json.task,
            description: json.taskDescription,
            projectId: newProject.id, 
        },
    });

    return NextResponse.json({
        project: newProject,
        task: newTask,
    });
}
