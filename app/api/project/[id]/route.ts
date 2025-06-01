import { NextResponse } from 'next/server';
import prisma from "@/src/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    console.log("Fetching project with ID:", id);
    // Validate input
    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }    // Fetch project
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
        include: {
            tasks: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });

    if (!project) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(project);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    console.log("Deleting project with ID:", id);
    // Validate input
    if (!id) {
        return NextResponse.json(
            { error: "Project ID is required" },
            { status: 400 }
        );
    }

    // Delete project
    await prisma.project.delete({
        where: { id: Number(id) },
    });


    return NextResponse.json({
        message: "Project deleted successfully",
    });
}