import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import { DeleteTaskButton } from "../../delete-tasks-button";
import { notFound } from "next/navigation";

export default async function ProjectPage({
    params,
}: {
    params: { projectId: string };
}) {
    const projectId = parseInt(params.projectId);
    
    if (isNaN(projectId)) {
        notFound();
    }

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            tasks: true,
        },
    });

    if (!project) {
        notFound();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.project}</CardTitle>
                <p className="text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Tâches</h2>
                {project.tasks.length === 0 ? (
                    <p className="text-muted-foreground">Aucune tâche pour ce projet.</p>
                ) : (
                    project.tasks.map((task) => (
                        <Card className="p-4 flex items-start gap-4 relative" key={task.id}>
                            <div className="absolute top-2 right-2">
                                <DeleteTaskButton id={task.id} />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="text-lg font-semibold text-primary">{task.task}</p>
                                <p className="max-w-[360px]">{task.description}</p>
                            </div>
                        </Card>
                    ))
                )}
                <Link 
                    href={`/dashboard/tasks/newtask?projectId=${project.id}`} 
                    className={buttonVariants({size: "lg", variant: "outline"})}
                >
                    Nouvelle Tâche
                </Link>
            </CardContent>
        </Card>
    );
}
