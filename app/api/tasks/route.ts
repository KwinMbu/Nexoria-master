import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request) {
   // Fetch all tasks for the authenticated user
   try {
       const tasks = await prisma.task.findMany({
           orderBy: {
               createdAt: 'desc',
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