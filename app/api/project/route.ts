import { NextResponse } from 'next/server';
import prisma from "@/src/lib/prisma";


export async function POST(request: Request) {
    try {
        const json = await request.json();

        // Validate input
        if (!json.project || !json.description) {
            return NextResponse.json(
                { error: "Project and description are required" },
                { status: 400 }
            );
        }

        // Create new project
        const newProject = await prisma.project.create({
            data: {
                project: json.project,
                description: json.description,
            },
        });

        return NextResponse.json({
            project: newProject,
        });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: "Failed to create project" },
            { status: 500 }
        );
    }
}
