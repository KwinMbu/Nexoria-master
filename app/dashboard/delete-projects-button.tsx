"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

export function DeleteProjectButton(props: {id: string}) {
    const [isConfirm, setIsConfirm] = useState(false);
    const router = useRouter();    const OnDelete = async () => {
        try {
            const result = await fetch(`/api/project/${props.id}/`, {
                method: "DELETE",
            });
            
            if (!result.ok) {
                const errorData = await result.json();
                console.error("Failed to delete project:", errorData.error || "Unknown error");
                alert("Erreur lors de la suppression du projet. Veuillez réessayer.");
                return;
            }
            
            router.refresh();
        } catch (error) {
            console.error("Network error:", error);
            alert("Erreur de connexion. Veuillez vérifier votre connexion internet.");
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
