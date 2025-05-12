"use client"

import { createTaskAction } from "./tasks-action";
import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function Page() {

    const createTask = async (FormData: FormData) => {
        const json = await createTaskAction({
            task: String(FormData.get("task name")),
            description: String(FormData.get("task description")),
        }, Number(FormData.get("project_id")));

        console.log(json);
    };

    return (
    <Card>
        <CardHeader>
            <CardTitle>New Task</CardTitle>
        </CardHeader>
        <CardContent>
            <form 
                action= {async (formData) => { 
                    await createTask(formData);
                }}
            >
                <Label>
                    Task
                    <Input name="task name" />
                </Label>
                <Label>
                    Description
                    <Input name="task description" className="mb-5" />
                </Label>
                <Label>
                    Project ID
                    <Input name="project_id" type="number" className="mb-5" />
                </Label>
                <Button type="submit">Create</Button>
            </form>
        </CardContent>
    </Card>
    )
}