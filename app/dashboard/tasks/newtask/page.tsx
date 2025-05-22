"use client"

import { createTaskAction } from "./tasks-action";
import { Button } from "@/src/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import { Checkbox } from "@/src/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner"; // Remplacer l'import toast
import { Sparkles } from "lucide-react";

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get("projectId");
    const [useAI, setUseAI] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const createTask = async (FormData: FormData) => {
        const taskName = String(FormData.get("task name"));
        const taskDescription = String(FormData.get("task description"));
        
        setIsLoading(true);
        
        try {
            if (useAI) {
                try {
                    // Appel à l'API d'IA pour générer des tâches
                    const response = await fetch('/api/ia-tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            description: taskDescription, 
                            projectId: Number(projectId) 
                        }),
                    });
                    
                    if (!response.ok) {
                        throw new Error("Erreur lors de la génération des tâches");
                    }
                    
                    const data = await response.json();
                    toast.success("Tâches générées avec succès", {
                        description: `${data.tasks.length} tâches ont été créées.`
                    });
                } catch (aiError) {
                    // Gestion spécifique des erreurs liées à l'IA
                    toast.error("Erreur IA", {
                        description: "Un problème est survenu avec l'IA. Essayez de créer la tâche manuellement."
                    });
                    console.error(aiError);
                    return; // Arrête l'exécution pour éviter de créer une tâche normale
                }
            } else {
                // Créer une seule tâche normalement
                await createTaskAction({
                    task: taskName,
                    description: taskDescription,
                }, Number(projectId));
            }
            
            if (projectId) {
                router.push(`/dashboard/projects/${projectId}`);
            }
        } catch (error) {
            // Erreurs générales
            toast.error("Erreur", {
                description: "Un problème est survenu lors de la création de la tâche."
            });
            console.error(error);
        } finally {
            setIsLoading(false);
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
                onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const formData = new FormData(e.currentTarget);
                    await createTask(formData);
                }}
            >
                <Label>
                    Task
                    <Input name="task name" required />
                </Label>
                <Label>
                    Ne pas mettre de description si vous utilisez l&apos;IA
                    <Input name="task description" className="mb-3" />
                </Label>
                
                <div className="flex items-center space-x-2 mb-5">
                    <Checkbox 
                        id="use-ai" 
                        checked={useAI} 
                        onCheckedChange={(checked) => setUseAI(checked === true)}
                    />
                    <label 
                        htmlFor="use-ai" 
                        className="text-sm font-medium leading-none flex items-center gap-1.5 cursor-pointer"
                    >                        <Sparkles className="h-4 w-4" />
                        Utiliser l&apos;IA pour générer des tâches à partir du projet
                    </label>
                </div>
                {useAI && (                    <p className="text-sm text-muted-foreground mb-5">
                        L&apos;IA utilisera la description du projet pour générer automatiquement des tâches. 
                        La description que vous saisissez ci-dessus sera utilisée comme contexte supplémentaire.
                    </p>
                )}                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Création en cours...' : 'Create'}
                </Button>
            </form>
        </CardContent>
    </Card>
    )
}