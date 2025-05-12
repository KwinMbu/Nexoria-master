"use client"

import { createTaskAction } from "./tasks-action";
import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get("projectId");

    const createTask = async (FormData: FormData) => {
        const json = await createTaskAction({
            task: String(FormData.get("task name")),
            description: String(FormData.get("task description")),
        }, Number(projectId));

        console.log(json);
        
        if (projectId) {
            router.push(`/dashboard/${projectId}`);
        }
    };

    return (
    <Card>
        <CardHeader>
            <CardTitle>New Task</CardTitle>
            {projectId && <p className="text-sm text-muted-foreground">Pour le projet ID: {projectId}</p>}
        </CardHeader>
        <CardContent>
            <form 
                action= {async (formData) => { 
                    await createTask(formData);
                }}
            >
                <Label>
                    Task
                    <Input name="task name" required />
                </Label>
                <Label>
                    Description
                    <Input name="task description" className="mb-5" required />
                </Label>
                <Button type="submit">Create</Button>
            </form>
        </CardContent>
    </Card>
    )
}