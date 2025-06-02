import { NextResponse } from 'next/server';
import prisma from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      console.error('Erreur: MISTRAL_API_KEY n\'est pas définie');
      return NextResponse.json(
        { error: "Configuration serveur incomplète" },
        { status: 500 }
      );
    }    const { task, projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "ProjectId requis" },
        { status: 400 }
      );
    }

    if (!task) {
      return NextResponse.json(
        { error: "Nom de tâche requis" },
        { status: 400 }
      );
    }

    // Récupérer le projet et sa description
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) }
    });    if (!project) {
      return NextResponse.json(
        { error: "Projet introuvable" },
        { status: 404 }
      );
    }

    // Appel à l'API Mistral
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small',        messages: [          {
            role: 'system',
            content: `Tu dois décomposer une tâche en 3 à 10 sous-tâches concrètes et réalisables.

RÈGLES SIMPLES:
- Décompose la tâche principale en étapes logiques
- Utilise des emojis pour styliser (🎯 📝 💻 🎨 ✅ 🚀 📊 etc.)
- Chaque tâche doit être claire et actionnable
- Priorité: Haute, Moyenne ou Basse
- Temps estimé en heures ou jours
- PAS de sous-sous-tâches, reste au même niveau

Format requis: "Tâche: [emoji] [nom de la tâche] | Priorité: [Haute/Moyenne/Basse] | Temps estimé: [X heures/jours]"

INTERDIT: astérisques, puces, formatage markdown`
          },
          {
            role: 'user',
            content: `Décompose cette tâche : "${task}"

Crée 3 à 10 sous-tâches concrètes pour accomplir cette tâche principale.

IMPORTANT: Réponds UNIQUEMENT avec des lignes qui commencent par "Tâche:" - pas d'astérisques, pas de puces, pas d'autres formatages. Organise les étapes dans l'ordre chronologique d'exécution.`
          }
        ],
        temperature: 0.7,
      }),
    });

    // Le reste du code reste inchangé
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API Mistral:', errorData);
      return NextResponse.json(
        { error: "Erreur lors de la communication avec l'API IA" },
        { status: 500 }
      );
    }    const data = await response.json();
    
    // Extraire les tâches du texte de réponse avec leurs informations
    const tasksText = data.choices[0].message.content;
    const tasksList = tasksText
      .split('\n')
      .filter(Boolean)
      .filter((line: string) => line.trim().length > 0);

    // Créer les tâches dans la base de données
    const createdTasks = [];
    for (const taskLine of tasksList) {
      // Extraire le nom de la tâche (tout ce qui est avant le premier |)
      let taskName = taskLine.trim();
      let priority = "Moyenne";
      let timeEstimate = "Non spécifié";
      
      // Essayer d'extraire les parties de la tâche 
      if (taskLine.includes('|')) {
        const parts = taskLine.split('|').map((part: string) => part.trim());
        
        // Extraire le nom de la tâche (enlever "Tâche:" si présent)
        taskName = parts[0].replace(/^Tâche\s*:\s*/i, '').trim();
        
        // Extraire la priorité si présente
        const priorityPart = parts.find((part: string) => part.toLowerCase().includes('priorité'));
        if (priorityPart) {
          priority = priorityPart.replace(/^Priorité\s*:\s*/i, '').trim();
        }
        
        // Extraire le temps estimé si présent
        const timePart = parts.find((part: string) => part.toLowerCase().includes('temps'));
        if (timePart) {
          timeEstimate = timePart.replace(/^Temps estimé\s*:\s*/i, '').trim();
        }
      }
      
      // Générer la description avec la priorité et le temps estimé
      const description = `Priorité: ${priority} | Temps estimé: ${timeEstimate}`;
      
      const task = await prisma.task.create({
        data: {
          task: taskName,
          description: description,
          projectId: Number(projectId)
        }
      });
      createdTasks.push(task);
    }

    return NextResponse.json({ tasks: createdTasks });
  } catch (error) {
    console.error('Error in AI tasks generation:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la génération des tâches" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}