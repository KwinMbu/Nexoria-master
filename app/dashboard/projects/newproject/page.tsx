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
            <CardTitle>New Project</CardTitle>
        </CardHeader>
        <CardContent>
            <form 
                action= {async (formData) => { 
                    await createProject(formData);
                }}
            >
                <Label>
                    Project
                    <Input name="project name" required/>
                </Label>
                <Label>
                    Description
                    <Input name="project description" className="mb-5" required />
                </Label>
                <Button type="submit">Create</Button>
            </form>
        </CardContent>
    </Card>
    )
}