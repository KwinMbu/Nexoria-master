import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

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