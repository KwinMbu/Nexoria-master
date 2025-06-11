
# 🚀 Nexoria

_Transformez vos idées en projets organisés avec l'IA_

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

----------

## 🎯 Pitch

> **Nexoria** est un outil qui permet de créer des tâches automatiquement en prenant la description du projet, spécialement conçu pour les personnes qui ont du mal à s'organiser et à séparer les tâches.

## 📋 Description

Nexoria permet aux individus de structurer leurs projets en divisant le travail en tâches claires, avec des priorités et des dates limites, facilitant ainsi l'organisation et la gestion du travail quotidien.

### 🤔 Pourquoi ce projet ?

Aujourd'hui, beaucoup de personnes ont du mal à organiser leur travail et à séparer les tâches de manière efficace. Nexoria facilite cette organisation grâce à un outil simple et puissant.

### 👥 Utilisateurs visés

-   🧠 Personnes ayant des difficultés à s'organiser
-   💼 Freelances
-   🎓 Étudiants
-   📈 Toute personne cherchant à mieux structurer son travail

## ✨ Features

<table> <tr> <td>✅</td> <td><strong>Création et suppression de projets</strong></td> <td>Organisez vos projets facilement</td> </tr> <tr> <td>✅</td> <td><strong>Création et suppression de tâches</strong></td> <td>Gérez les tâches liées à chaque projet</td> </tr> <tr> <td>✅</td> <td><strong>Gestion des priorités et échéances</strong></td> <td>Suivez vos deadlines et priorités</td> </tr> <tr> <td>🤖</td> <td><strong>Création de tâches automatique avec l'IA</strong></td> <td>Laissez l'IA décomposer vos projets</td> </tr> </table>

> 💡 **Pourquoi ces features ?**  
> Chaque fonctionnalité vise à simplifier le suivi et la gestion du travail quotidien, tout en aidant les utilisateurs à mieux organiser et séparer leurs tâches.

## 🛠️ Stack Technique

**Catégorie**

**Technologies**

🎨 **Front-end**

Next.js • Tailwind CSS

⚙️ **Back-end**

Node.js

🗄️ **Base de données**

PostgreSQL (Supabase)

🚀 **Déploiement**

Vercel

🧰 **Outils**

Git • Postman • Prisma

## 🚀 Installation & Lancement

> 💫 **Le projet est prêt à être utilisé !** Il vous suffit de configurer les variables d'environnement pour démarrer l'application.

### 📥 Étape 1 : Cloner le projet

```bash
git clone https://github.com/KwinMbu/Nexoria-master
```

### 📂 Étape 2 : Accéder au dossier

```bash
cd Nexoria-master
```

### 📦 Étape 3 : Installer les dépendances

```bash
npm install 
```

### 🔧 Étape 4 : Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez toutes les variables d'environnement nécessaires :

```bash
# 🤖 API Keys
MISTRAL_API_KEY="votre-clé-api-mistral"

# 🔗 Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="votre-url-supabase"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-clé-anon-supabase"
SUPABASE_SERVICE_ROLE_KEY="votre-clé-service-role"
SUPABASE_JWT_SECRET="votre-jwt-secret"

# 🗄️ Database URLs
DATABASE_URL="votre-database-url-postgresql"
POSTGRES_PRISMA_URL="votre-postgres-prisma-url"
POSTGRES_URL="votre-postgres-url"
POSTGRES_URL_NON_POOLING="votre-postgres-url-non-pooling"

# 🔐 Database Credentials
POSTGRES_HOST="votre-host-postgres"
POSTGRES_DATABASE="postgres"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="votre-mot-de-passe"
```

### 🔄 Étape 5 : Synchroniser la base de données

```bash
npx prisma db push
```

### ▶️ Étape 6 : Lancer le projet

```bash
npm run dev
```

### 🌐 Étape 7 : Ouvrir dans le navigateur

Accédez à `http://localhost:3000` et profitez de Nexoria ! 🎉

----------

## ⚡ Configuration requise

**Prérequis**

**Description**

🗄️ **Base de données PostgreSQL**

Nous recommandons Supabase pour sa simplicité

🤖 **Clé API Mistral**

Nécessaire pour les fonctionnalités IA

🔧 **Variables d'environnement**

Toutes les variables doivent être configurées dans `.env.local`


----------
## 🌐 Déploiement

🚀 **Le projet est configuré pour être déployé sur Vercel**

> ⚠️ **Important :** Les variables d'environnement doivent être ajoutées dans les paramètres de votre projet Vercel

----------

### 🎉 Merci d'utiliser Nexoria !

_Organisez vos projets comme jamais auparavant_ ✨

[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/KwinMbu/Nexoria-master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/KwinMbu/Nexoria-master/pulls)
