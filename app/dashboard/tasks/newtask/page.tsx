"use client"

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
                    const response = await fetch('/api/ia-tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            task: taskName, 
                            projectId: Number(projectId) 
                        }),
                    });
                    
                    if (!response.ok) {
                        throw new Error("Erreur lors de la génération des tâches");
                    }
                      const data = await response.json();
                    toast.success("Tâches analysées avec succès", {
                        description: `${data.tasks.length} tâches ont été créées à partir de votre demande.`
                    });                } catch (aiError) {
                    // Gestion spécifique des erreurs liées à l'IA
                    toast.error("Erreur IA", {
                        description: "Un problème est survenu avec l'IA. Essayez de créer la tâche manuellement."
                    });
                    console.error(aiError);
                    return; // Arrête l'exécution pour éviter de créer une tâche normale
                }
            } else {
                // Créer une seule tâche normalement
                await fetch(`/api/project/${projectId}/task`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        task: taskName,
                        description: taskDescription,
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de la création de la tâche");
                    }
                    return response.json();
                })
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
            {projectId && <p className="text-sm text-muted-foreground">For project ID: {projectId}</p>}
        </CardHeader>
        <CardContent>
            <form 
                onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const formData = new FormData(e.currentTarget);
                    await createTask(formData);
                }}
                className="flex flex-col gap-5"
            >
                <Label className="text-base font-semibold mb-1">
                    Task
                    <Input name="task name" required className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80" placeholder="Task name" />
                </Label>                
                {!useAI && (
                    <Label className="text-base font-semibold mb-1">
                        Description <span className="text-xs text-muted-foreground">(optional)</span>
                        <Input name="task description" className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80 mb-3" placeholder="Describe the task..." />
                    </Label>
                )}
                <div className="flex items-center space-x-2 mb-5 mt-5">
                    <Checkbox 
                        id="use-ai" 
                        checked={useAI} 
                        onCheckedChange={(checked) => setUseAI(checked === true)}
                        className="border-primary focus:ring-primary/60 focus:border-primary transition"
                    />
                    <label 
                        htmlFor="use-ai" 
                        className="text-sm font-medium leading-none flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors"
                    >
                        <Sparkles className="h-4 w-4 text-primary/80" />
                        Use AI to analyze and split this task
                    </label>
                </div>
                {useAI && (
                    <p className="text-xs text-muted-foreground mb-5 italic bg-primary/5 rounded px-3 py-2 border border-primary/10">
                        AI will use the project description as context and analyze the task name to split it into subtasks if needed.
                    </p>
                )}
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-md hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? 'Processing...' : 'Create'}
                </Button>
            </form>
        </CardContent>
    </Card>
    )
}