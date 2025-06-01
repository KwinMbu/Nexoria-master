import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Invalid project ID" },
            { status: 400 }
        );
    }

    try {        const tasks = await prisma.task.findMany({
            where: { projectId: Number(id) },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}