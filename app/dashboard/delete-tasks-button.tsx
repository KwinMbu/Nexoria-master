"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { deleteTaskAction } from "./tasks/newtask/tasks-action";

export function DeleteTaskButton(props: {id: number}) {
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();

    const OnDelete = async () => {
        const result = await deleteTaskAction(props.id)
        if (result.message) {
            router.refresh();
        }
    };

    return (
    <Button
    onClick={() => {
        if (isConfirm) {
            OnDelete();
        } else {
            setIsConfirm(true);
        }
    }}
    variant={isConfirm ? "destructive" : "outline"}>X</Button>)
}
