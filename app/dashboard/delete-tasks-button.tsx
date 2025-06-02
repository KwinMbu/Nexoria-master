"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export function DeleteTaskButton(props: {id: number}) {
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();

    const OnDelete = async () => {
        const result = await fetch(`/api/task/${props.id}`, {
            method: "DELETE",
            }
        );
        if (!result.ok) {
            console.error("Failed to delete task");
            return;
        }
        router.refresh();
    }

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
