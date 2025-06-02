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
            <CardTitle className="text-2xl font-bold text-primary mb-1">New Task</CardTitle>
            {projectId && <p className="text-xs text-muted-foreground italic">Pour le projet ID: {projectId}</p>}
        </CardHeader>
        <CardContent>
            <form 
                className="flex flex-col gap-5"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const formData = new FormData(e.currentTarget);
                    await createTask(formData);
                }}
            >
                <Label className="text-base font-semibold mb-1"> 
                    Task
                    <Input 
                        name="task name" 
                        required 
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80" 
                        placeholder="Nom de la tâche" 
                    />
                </Label>                
                
                {!useAI && (
                    <Label className="text-base font-semibold mb-1">
                        Description <span className="text-xs text-muted-foreground">(optionnel)</span>
                        <Input 
                            name="task description" 
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition placeholder:text-gray-400 bg-white/80 mb-3" 
                            placeholder="Décrivez la tâche..." 
                        />
                    </Label>
                )}
                
                <div className="flex items-center space-x-3 mb-5 mt-5">
                    <Checkbox 
                        id="use-ai" 
                        checked={useAI} 
                        onCheckedChange={(checked) => setUseAI(checked === true)}
                        className="border-primary focus:ring-primary/60 focus:border-primary transition"
                    />
                    <label 
                        htmlFor="use-ai" 
                        className="text-sm font-medium leading-none flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors"
                    >                        <Sparkles className="h-4 w-4 text-primary/80" />
                        Utiliser l&apos;IA pour analyser et diviser cette tâche
                    </label>
                </div>
                {useAI && (                    <p className="text-xs text-muted-foreground mb-5 italic bg-primary/5 rounded px-3 py-2 border border-primary/10">
                        L&apos;IA utilisera la description du projet comme contexte et analysera le nom de la tâche 
                        pour la diviser en sous-tâches si nécessaire.
                    </p>
                )}                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-md hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? 'Traitement en cours...' : 'Créer'}
                </Button>
            </form>
        </CardContent>
    </Card>
    )
}