"use client"

import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { redirect } from "next/navigation";

export default function Page() {

    const createProject = async (formData: FormData) => {
        const projectName = String(formData.get("project name"));
        const projectDescription = String(formData.get("project description"));

        try {
            fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project: projectName,
                    description: projectDescription,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to create project");
                }
                return response.json();
            }
            )
            .then(data => {
                console.log("Project created successfully:", data);
                const projectId = data.project?.id;
                if (!projectId) {
                    throw new Error("Project ID is missing in the response");
                }
                redirect(`/dashboard/projects/${projectId}`); // Redirect to projects page after creation
            }
            )
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary mb-1">New Project</CardTitle>
        </CardHeader>
        <CardContent>
            <form 
                className="flex flex-col gap-5"
                action={async (formData) => { 
                    await createProject(formData);
                }}
            >
                <Label className="text-base font-semibold mb-1">
                    Project name
                    <Input 
                        name="project name" 
                        required 
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80" 
                        placeholder="Enter the project name" 
                    />
                </Label>
                <Label className="text-base font-semibold mb-1">
                    Description
                    <Input 
                        name="project description" 
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80 mb-5" 
                        placeholder="Describe your project..." 
                        required 
                    />
                </Label>
                <Button 
                    type="submit" 
                    className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-md hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    Create
                </Button>
            </form>
        </CardContent>
    </Card>
    )
}