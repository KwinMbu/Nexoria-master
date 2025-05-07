import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({
        ok: true,
    });
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();


    const newProject= await prisma.project.create({
        data: {
            project: String(formData.get("project name")),
            description: String(formData.get("project description")),
        },
    });

    return NextResponse.json({
        project: newProject,
    });
}
