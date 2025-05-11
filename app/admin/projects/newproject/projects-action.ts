"use server";

import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export async function createProjectAction(project: { 
    project: string, 
    description: string,
}) {
    const newProject= await prisma.project.create({
        data: {
            project: project.project,
            description: project.description,
        },
    });

    if (newProject) {
        redirect("/admin");
    }
    
    return {
        error: "Error while creating project",
    }
}

export async function deleteProjectAction(id: number) {
    await prisma.project.delete({
        where: {
            id,
        },
    });
    return {
        message : "Project deleted",
    };
}