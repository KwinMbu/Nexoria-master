import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      console.error('Erreur: MISTRAL_API_KEY n\'est pas définie');
      return NextResponse.json(
        { error: "Configuration serveur incomplète" },
        { status: 500 }
      );
    }

    const { description, projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "ProjectId requis" },
        { status: 400 }
      );
    }

    // Récupérer le projet et sa description
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) }
    });

    if (!project) {
      return NextResponse.json(
        { error: "Projet introuvable" },
        { status: 404 }
      );
    }

    // Utiliser la description du projet
    const projectDescription = project.description;
    
    // Si description de tâche fournie, l'ajouter comme contexte supplémentaire
    const contextDescription = description ? 
      `${projectDescription} \nContexte supplémentaire: ${description}` : 
      projectDescription;

    // Appel à l'API Mistral
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en gestion de projet, donc tu évites de dire "Cette tâche consiste à". Décompose ce projet en tâches concrètes avec leur priorité et temps estimé. Pour chaque tâche, présente-la au format "Tâche: [nom de la tâche avec emoji] | Priorité: [Haute/Moyenne/Basse] | Temps estimé: [X heures/jours]".'
          },
          {
            role: 'user',
            content: `Voici la description d'un projet: "${contextDescription}". Décompose-le en 5 à 8 tâches concrètes et actionnables. Pour chaque tâche, indique sa priorité (Haute, Moyenne ou Basse) et le temps estimé pour la réaliser.`
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
    }

    const data = await response.json();
    
    // Extraire les tâches du texte de réponse avec leurs informations
    const tasksText = data.choices[0].message.content;
    const tasksList = tasksText
      .split('\n')
      .filter(Boolean)
      .filter( line => line.trim().length > 0);

    // Créer les tâches dans la base de données
    const createdTasks = [];
    for (const taskLine of tasksList) {
      // Extraire le nom de la tâche (tout ce qui est avant le premier |)
      let taskName = taskLine.trim();
      let priority = "Moyenne";
      let timeEstimate = "Non spécifié";
      
      // Essayer d'extraire les parties de la tâche 
      if (taskLine.includes('|')) {
        const parts = taskLine.split('|').map(part => part.trim());
        
        // Extraire le nom de la tâche (enlever "Tâche:" si présent)
        taskName = parts[0].replace(/^Tâche\s*:\s*/i, '').trim();
        
        // Extraire la priorité si présente
        const priorityPart = parts.find( part => part.toLowerCase().includes('priorité'));
        if (priorityPart) {
          priority = priorityPart.replace(/^Priorité\s*:\s*/i, '').trim();
        }
        
        // Extraire le temps estimé si présent
        const timePart = parts.find(part => part.toLowerCase().includes('temps'));
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