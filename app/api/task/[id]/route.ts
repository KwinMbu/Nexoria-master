import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string}> }
) {
    const { id } = await params;

    // Validate input
    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Task ID and project ID are required" },
            { status: 400 }
        );
    }

    // Delete task
    await prisma.task.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({
        message: "Task deleted successfully",
    });
}