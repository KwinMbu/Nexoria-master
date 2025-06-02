"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { DeleteTaskButton } from "../../delete-tasks-button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

interface Task {
    id: number;
    task: string;
    description: string;
    createdAt: string;
}

interface Project {
    id: number;
    project: string;
    description: string;
    tasks: Task[];
}

export default function ProjectPage() {
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();    const projectId = params.projectId as string;

    const fetchProject = useCallback(async () => {
        if (!projectId || isNaN(Number(projectId))) {
            router.push('/404');
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(`/api/project/${projectId}`, { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                setProject(data);
            }
        } catch (error) {
            console.error("Error fetching project:", error);
        } finally {
            setLoading(false);
        }
    }, [projectId, router]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    if (loading || !project) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <Link 
                            href="/dashboard" 
                            className={buttonVariants({size: "default", variant: "outline"}) + " hover:bg-black hover:text-white transition"}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to dashboard
                        </Link>
                        <Button 
                            onClick={fetchProject}
                            variant="outline" 
                            size="default"
                            disabled
                            className="hover:bg-black hover:text-white transition"
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
                        className={buttonVariants({size: "default", variant: "outline"}) + " hover:bg-black hover:text-white transition"}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to dashboard
                    </Link>
                </div>
                <CardTitle className="text-2xl font-bold text-primary mb-1 drop-shadow-sm tracking-tight">{project.project}</CardTitle>
                <p className="text-muted-foreground text-base mb-2 w-full bg-primary/5 rounded px-3 py-2 border border-primary/10 font-medium">{project.description}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-lg font-semibold text-primary flex items-center gap-2">
                        Tasks
                    </p>
                    <div className="flex gap-2 items-center">
                        <Button 
                            onClick={fetchProject}
                            variant="outline"
                            size="default"
                            disabled={loading}
                            className="h-10 hover:bg-black hover:text-white transition"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                        <Link 
                            href={`/dashboard/tasks/newtask?projectId=${project.id}`} 
                            className={buttonVariants({size: "default", variant: "outline"}) + " h-10 flex items-center hover:bg-black hover:text-white transition"}
                        >
                            Create new task
                        </Link>
                    </div>
                </div>
                {project.tasks.length === 0 ? (
                    <p className="text-muted-foreground">No tasks for this project.</p>
                ) : (
                    project.tasks.map((task: Task) => (
                        <Card className="p-4 flex items-start gap-4 relative border border-primary/10 bg-white/90 shadow-sm hover:shadow-lg transition group" key={task.id}>
                            <div className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition">
                                <DeleteTaskButton id={Number(task.id)} />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <p className="text-lg font-semibold text-primary group-hover:underline underline-offset-4 transition">{task.task}</p>
                                <p className="max-w-[360px] text-gray-700 group-hover:text-primary/80 transition">{task.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    Created: {new Date(task.createdAt).toLocaleString('en-GB')}
                                </p>
                            </div>
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    );
}