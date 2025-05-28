import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const json = await req.json();
    const { id } = await params;

    // Validate input
    if (!json.task || !id) {
        return NextResponse.json(
            { error: "Task and projectId are required" },
            { status: 400 }
        );
    }

    // Create new task
    const newTask = await prisma.task.create({
        data: {
            projectId: Number(id),
            task: json.task || "",
            description: json.description || "",
        },
    });

    return NextResponse.json({
        task: newTask,
    });
}

