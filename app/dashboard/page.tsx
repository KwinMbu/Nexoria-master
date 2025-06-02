"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Link from "next/link";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { DeleteProjectButton } from "./delete-projects-button";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

interface Project {
  id: number;
  project: string;
  description: string;
  createdAt: Date;
  _count: {
    tasks: number;
  };
  }

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-xl">My project</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={fetchProjects}
              variant="outline" 
              size="default"
              disabled
            >
              <RefreshCw className="h-4 w-4 animate-spin" />
            </Button>
            <Link 
              href="/dashboard/projects/newproject" 
              className={buttonVariants({size: "default", variant: "outline"})}
            >
              Create new project
            </Link>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-500">Loading projects...</p>
        </CardContent>
      </Card>
    );
  }
  if (!projects || projects.length === 0) {
  return (
    <Card className="w-full">
    <CardHeader className="flex items-center justify-between">
      <CardTitle className="text-xl">My project</CardTitle>
      <div className="flex gap-2">
        <Button 
          onClick={fetchProjects}
          variant="outline" 
          size="default"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
        <Link 
          href="/dashboard/projects/newproject" 
          className={buttonVariants({size: "default", variant: "outline"})}
        >
          Create new project
        </Link>
      </div>
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
    <div className="flex gap-2">
      <Button 
        onClick={fetchProjects}
        variant="outline" 
        size="default"
        disabled={loading}
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      </Button>
      <Link 
        href="/dashboard/projects/newproject" 
        className={buttonVariants({size: "default", variant: "outline"})}
      >
        Create new project
      </Link>
    </div>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
    {projects.map((project: Project) => (
      <Card className="p-4 relative" key={project.id}>
      <div className="absolute top-4 right-4">
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
