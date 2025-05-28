"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { DeleteTaskButton } from "../../delete-tasks-button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectPage(props: { 
  params: Promise<{
    projectId: string;
  }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [projectId, setProjectId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const initializeParams = async () => {
            const params = await props.params;
            const id = parseInt(params.projectId);
            
            if (isNaN(id)) {
                router.push('/404');
                return;
            }
            
            setProjectId(id);
        };
        
        initializeParams();
    }, [props.params, router]);

    const fetchProject = async () => {
        if (!projectId) return;
        
        setLoading(true);
        try {
            const response = await fetch(`/api/project/${projectId}`, { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                setProject(data);
            } else {
                router.push('/404');
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            router.push('/404');
        } finally {
            setLoading(false);
        }
    };    useEffect(() => {
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

    if (loading || !project) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <Link 
                            href="/dashboard" 
                            className={buttonVariants({size: "sm", variant: "outline"})}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                        </Link>
                        <Button 
                            onClick={fetchProject}
                            variant="outline" 
                            size="sm"
                            disabled
                        >
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        </Button>
                    </div>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Loading project details...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <Link 
                        href="/dashboard" 
                        className={buttonVariants({size: "sm", variant: "outline"})}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
                    </Link>
                    <Button 
                        onClick={fetchProject}
                        variant="outline" 
                        size="sm"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
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
