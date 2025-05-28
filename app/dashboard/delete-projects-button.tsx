"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export function DeleteProjectButton(props: {id: string}) {
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();

    const OnDelete = async () => {
        const result = await fetch(`/api/project/${props.id}/`, {
            method: "DELETE",
        });
        if (!result.ok) {
            console.error("Failed to delete project");
            return;
        }
        router.refresh();
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
