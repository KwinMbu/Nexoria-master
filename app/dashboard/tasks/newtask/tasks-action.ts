"use server";

import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";


export async function createTaskAction(
    task: { 
        task: string, 
        description: string,
    },
    projectId: number
){
    const newTask= await prisma.task.create({
        data: {
            task: task.task,
            description: task.description,
            project: {
                connect: {
                    id: projectId, 
                },
            }
        },
    });

    if (newTask) {
        redirect("/dashboard");
    }
    
    return {
        error: "Error while creating task",
    }
}

export async function deleteTaskAction(id: number) {
    await prisma.task.delete({
        where: {
            id,
        },
    });
    return {
        message : "Task deleted",
    };
}