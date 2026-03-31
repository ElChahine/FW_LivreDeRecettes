# 🍳 Livre de Recettes - Projet Vue.js

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

**Répartition par domaines :**

* **Noé Loisel** : 
  * **Fondations** : Configuration du Routeur, création du menu de navigation et architecture globale des pages.
  * **Composants & UI** : Création du composant `RecipeCard.vue`, refonte complète de la liste et de la page de détails des recettes.
  * **Authentification** : Mise en place du système de connexion avec Pinia et protection des routes via Navigation Guards.
  * **Persistance des données** : Finalisation de l'intégration Axios et gestion du `localStorage` pour la persistance des favoris par compte.

* **Chahine Bensafia** :
  * **Architecture API** : Intégration complète de l'API TheMealDB avec Axios, configuration des requêtes dynamiques.
  * **Fonctionnalités métier** : Implémentation de la recherche globale, chargement dynamique des recettes, système de favoris avec Pinia.
  * **Features avancées** : Création du système de profil utilisateur, gestion des bibliothèques de recettes et placement en collection.
  * **Design & UX** : Création et intégration du design CSS global de l'application.

**Organisation** : Utilisation d'un système de branches dédiées par fonctionnalités (`feat/auth`, `feat/libraries`, `feat/global-search`) pour travailler en parallèle sur GitHub.

## 🛠 Difficultés rencontrées et Solutions
1.  **Gestion des conflits Git** : Lors de la fusion des branches (merge), des conflits sur `package-lock.json` et `router/index.js` sont apparus. 
    * *Solution* : Utilisation du `git stash` pour mettre de côté les changements locaux avant le merge, et résolution manuelle des conflits en équipe.
    
2.  **Formatage des instructions de l'API** : Les instructions de préparation arrivaient en un seul bloc de texte illisible.
    * *Solution* : Mise en place d'une fonction calculée (`computed`) utilisant des Expressions Régulières (Regex) pour découper le texte en étapes numérotées.
    
3.  **Synchronisation des favoris entre sessions** : Les modifications dans un onglet n'étaient pas immédiatement visibles dans les autres instances ouvertes.
    * *Solution* : Implémentation d'écouteurs `storage` pour détecter les changements du `localStorage` et mettre à jour les stores Pinia en temps réel.
    
4.  **Persistance des favoris liée au profil utilisateur** : Les favoris d'un utilisateur apparaissaient pour tous les comptes après reconnexion.
    * *Solution* : Structuration du `localStorage` avec une clé composée (`user_${userId}_favorites`) et nettoyage complet des stores lors de la déconnexion.

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