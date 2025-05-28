import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { DeleteTaskButton } from "../../delete-tasks-button";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ProjectPage(props: { 
  params: Promise<{
    projectId: string;
  }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {    const params = await props.params;
    const projectId = parseInt(params.projectId);
    
    if (isNaN(projectId)) {
        notFound();
    }

    // Get the base URL for API calls
    const baseUrl = process.env.VERCEL_URL || 'http://localhost:3000';
    
    const project = await fetch(`${baseUrl}/api/project/${projectId}`, {
        method: "GET",
        cache: 'no-store',
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch project");
        }
        return res.json();
    }
    ).catch((error) => {
        console.error("Error fetching project:", error);
        notFound();
    });

    if (!project) {
        notFound();
    }

    return (
        <Card>
            <CardHeader>
                {/* Bouton de retour au dashboard */}
                <div className="flex items-center mb-4">
                    <Link 
                        href="/dashboard" 
                        className={buttonVariants({size: "sm", variant: "outline"})}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Link>
                </div>
                <CardTitle>{project.project}</CardTitle>
                <p className="text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p className="flex items-center justify-between text-lg font-semibold">Tâches
                <Link 
                    href={`/dashboard/tasks/newtask?projectId=${project.id}`} 
                    className={buttonVariants({size: "lg", variant: "outline"})}
                >
                     Create New Task
                </Link>
                </p>
                {project.tasks.length === 0 ? (
                    <p className="text-muted-foreground">Aucune tâche pour ce projet.</p>
                ) : (
                    project.tasks.map((task: { id: string; task: string; description: string }) => (
                        <Card className="p-4 flex items-start gap-4 relative" key={task.id}>
                            <div className="absolute top-2 right-2">
                                <DeleteTaskButton id={Number(task.id)} />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="text-lg font-semibold text-primary">{task.task}</p>
                                <p className="max-w-[360px]">{task.description}</p>
                            </div>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
