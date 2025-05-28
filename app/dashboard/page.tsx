import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { DeleteProjectButton } from "./delete-projects-button";
import prisma from "@/src/lib/prisma";

interface Project {
    id: number;
    project: string;
    description: string;
    createdAt: Date;
    _count: {
      tasks: number;
    };
  }

export default async function Dashboard() {
  let projects: Project[] = [];
  
  try {
    projects = await prisma.project.findMany({
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    projects = [];
  }

  if (!projects || projects.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">My project</CardTitle>
          <Link 
            href="/dashboard/projects/newproject" 
            className={buttonVariants({size: "default", variant: "outline"})}
          >
            Create new project
          </Link>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500">You have no projects yet. Start by creating one!</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">My project</CardTitle>
        <Link 
          href="/dashboard/projects/newproject" 
          className={buttonVariants({size: "default", variant: "outline"})}
        >
          Create new project
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
   

        {projects.map((project: Project) => (
          <Card className="p-4 relative" key={project.id}>            <div className="absolute top-4 right-4">
              <DeleteProjectButton id={project.id.toString()}/>
            </div>
            
            <div className="pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="text-lg font-semibold text-primary">{project.project}</p>
                <Button variant="secondary" className="text-xs px-2 py-1 h-auto bg-transparent">
                  {project._count.tasks} {project._count.tasks === 1 ? 'task' : 'tasks'}
                </Button>
              </div>
              
              <Link 
                href={`/dashboard/projects/${project.id}`}
                className="flex flex-col gap-2 cursor-pointer mt-2"
              > 
                <p className="max-w-full text-sm sm:text-base">{project.description}</p>
              </Link>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}