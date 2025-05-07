"use client"

import { createProjectAction } from "./projects.action";
import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function Page() {

    const createProject = async (FormData: FormData) => {
        const json = await createProjectAction({
            project: String(FormData.get("project name")),
            description: String(FormData.get("project description")),
        });

        console.log(json);
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
                    <Input name="project name" />
                </Label>
                <Label>
                    Description
                    <Input name="project description" className="mb-5" />
                </Label>
                <Button type="submit">Create</Button>
            </form>
        </CardContent>
    </Card>
    )
}