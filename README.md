# Nexoria

## Pitch
Nexoria est un outil qui permet de créer des tâches automatiquement en prenant la description du projet, spécialement conçu pour les personnes qui ont du mal à s'organiser et à séparer les tâches.

## Description
Nexoria permet aux individus de structurer leurs projets en divisant le travail en tâches claires, avec des priorités et des dates limites, facilitant ainsi l'organisation et la gestion du travail quotidien.
**Pourquoi ce projet ?** Aujourd'hui, beaucoup de personnes ont du mal à organiser leur travail et à séparer les tâches de manière efficace. Nexoria facilite cette organisation grâce à un outil simple et puissant.
**Utilisateurs visés :** personnes ayant des difficultés à s'organiser, freelances, étudiants, et toute personne cherchant à mieux structurer son travail.

## Features

- [x] Création et suppression de projets
- [x] Création et suppression de tâches liées à un projet
- [x] Gestion des priorités et échéances des tâches
- [x] Création de tâches automatique avec l'IA

*Pourquoi ces features ?*
Chaque fonctionnalité vise à simplifier le suivi et la gestion du travail quotidien, tout en aidant les utilisateurs à mieux organiser et séparer leurs tâches.

## Stack Technique

- **Front-end :** Next.js, Tailwind CSS
- **Back-end :** Node.js
- **Base de données :** SQLite
- **Déploiement :** Vercel
- **Outils supplémentaires :** Git, Postman

## Installation & Lancement

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/KwinMbu/Nexoria-master
   ```

2. Accédez au dossier du projet :

    ```bash
    cd Nexoria-master
    ```

3. Installez les dépendances :

    ```bash 
    npm install 
    ```

4. Créez un fichier .env à la racine du projet et ajoutez les variables d'environnement suivantes : 

    ```bash
    DATABASE_URL="file:./dev.db"
    MISTRAL_API_KEY="Votre-clé-API-Mistral"
    ```

5. Initialisez la base de données avec Prisma : 

    ```bash
    npx prisma migrate dev --name db
    ```

6. Lancez le projet en mode développement : 

    ```bash
    npm run dev
    ```
