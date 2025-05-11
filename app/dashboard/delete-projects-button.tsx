"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { deleteProjectAction } from "./projects/newproject/projects-action";

export function DeleteProjectButton(props: {id: number}) {
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();

    const OnDelete = async () => {
        const result = await deleteProjectAction(props.id)
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
