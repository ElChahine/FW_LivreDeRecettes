# 🍳 Mon Carnet Gourmand - Projet Vue.js

## 🎯 Objectif du projet
L'objectif de cette application est de permettre aux passionnés de cuisine de découvrir de nouvelles recettes via l'API **TheMealDB**, de gérer leurs favoris et d'organiser leurs propres bibliothèques de recettes personnalisées. L'application offre une expérience fluide pour rechercher, consulter et sauvegarder des inspirations culinaires.

## ✨ Fonctionnalités principales
* **Exploration dynamique** : Recherche de recettes par nom et filtrage par catégories (Bœuf, Poulet, Desserts, etc.).
* **Fiches détaillées** : Affichage structuré des ingrédients et des étapes de préparation numérotées.
* **Système d'Authentification** : Accès sécurisé aux fonctionnalités personnalisées.
* **Gestion des Favoris** : Possibilité de "liker" des recettes pour les retrouver facilement.
* **Bibliothèques Personnalisées (Collections)** : Création, modification et suppression de dossiers pour organiser ses recettes par thème (ex: "Mes desserts préférés").
* **Accueil Dynamique** : Suggestions de recettes aléatoires à chaque visite.

## 👥 Équipe et Organisation
* **Bensafia Chahine** : INCOMPLET
* **Loisel Noé** : INCOMPLET
* **Organisation** : INCOMPLET

## 🛠 Difficultés rencontrées et Solutions
1.  **Gestion des conflits Git** : Lors de la fusion des branches (merge), des conflits sur `package-lock.json` sont apparus. 
    * *Solution* : Utilisation du `git stash` pour mettre de côté les changements locaux avant le merge.
2.  **Formatage des instructions de l'API** : Les instructions de préparation arrivaient en un seul bloc de texte illisible.
    * *Solution* : Mise en place d'une fonction calculée (computed) utilisant des Expressions Régulières (Regex) pour découper le texte en étapes numérotées.
3.  **Erreurs d'importation Vite** : Problèmes de résolution de chemins lors de l'ajout de nouvelles vues.
    * *Solution* : Vérification rigoureuse de la casse des noms de fichiers et des chemins relatifs dans `router/index.js`.

## 🚀 Installation et Lancement

### Prérequis
* Node.js installé sur votre machine.

### Étapes
1.  **Extraire le fichier ZIP** dans votre dossier de travail.
2.  **Installer les dépendances** :
    ```bash
    npm install
    ```
3.  **Lancer l'application** en mode développement :
    ```bash
    npm run dev
    ```
4.  Ouvrir votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`).