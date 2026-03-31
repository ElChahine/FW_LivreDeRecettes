# 🍲 Mon Carnet Gourmand - Projet Vue.js

## 🎯 Objectif du projet
Créer une application web interactive permettant de consulter une liste de plats et leurs détails complets.

## 🚀 Fonctionnalités principales
- **Liste dynamique de recettes** : Affichage progressif des plats chargés depuis l'API publique TheMealDB.
- **Recherche globale** : Barre de recherche permettant de filtrer les plats en temps réel.
- **Détails de la recette** : Page dédiée affichant les informations complètes (catégorie, ingrédients, instructions).
- **Système de Favoris** : Sauvegarde des recettes likées par compte utilisateur avec filtre exclusif.
- **Authentification** : Système de connexion simulé avec protection des pages privées.
- **Collections privées** : Possibilité de classer des recettes dans des bibliothèques personnalisées.

## 👥 Qui a fait quoi
*Répartition du travail par domaines critiques :*

- **Noé Loisel** : 
  - **Fondations** : Configuration du Routeur, création du menu de navigation et architecture globale des pages.
  - **Composants & UI** : Création du composant (`RecipeCard.vue`), refonte complète de la liste et la page de détails des recettes.
  - **Authentification** : Mise en place du système de connexion avec Pinia et protection des routes via Navigation Guards.
  - **Persistance des données** : Finalisation de l'intégration Axios et gestion du `localStorage` pour la persistance des favoris par compte.

- **Chahine Bensafia** :
  - **Architecture API** : Intégration complète de l'API TheMealDB avec Axios, configuration des requêtes dynamiques.
  - **Fonctionnalités métier** : Implémentation de la recherche globale, chargement dynamique des recettes, système de favoris avec Pinia.
  - **Features avancées** : Création du système de profil utilisateur, gestion des bibliothèques de recettes et placement en collection.
  - **Design & UX** : Création et intégration du design CSS global de l'application.


## 📅 Comment nous nous sommes organisés
- **Gestion de version (Git/GitHub)** : Système de branches dédiées par fonctionnalités (`feat/auth`, `feat/libraries`, `feat/global-search`, `feat/desig-css`) pour travailler en parallèle. Fusions régulières sur `main` via pull requests.
- **Répartition des tâches** : Chahine a porté l'architecture générale, l'API et les fonctionnalités principales. Noé a géré le routeur, les composants et l'authentification. Collaboration sur le CSS et l'optimisation du système de favoris.

## 🚧 Difficultés rencontrées et solutions
1. **Synchronisation des favoris entre onglets** : Les modifications dans un onglet n'étaient pas visibles dans les autres (Pinia stockait l'état en mémoire sans communication entre instances).
   - *Solution : Implémentation d'écouteurs `storage` pour détecter les changements du `localStorage` et mettre à jour les stores en temps réel.*
   
2. **Gestion des erreurs API lors du chargement des recettes** : Absence de gestion des timeouts et des réponses invalides, ce qui causait des crashs silencieux.
   - *Solution : Ajout de try-catch systématiques, gestion des codes HTTP, et feedback utilisateur en cas d'erreur réseau.*
   
3. **Persistance des favoris liée au profil utilisateur** : Les favoris d'un utilisateur apparaissaient pour tous les utilisateurs après reconnexion.
   - *Solution : Structuration du `localStorage` avec clé compostée (`user_${userId}_favorites`) et nettoyage des stores lors de la déconnexion.*
   
4. **Performance du rendu avec de longues listes de recettes** : La liste complète se chargeait sans pagination, causant des ralentissements significatifs.
   - *Solution : Implémentation d'un chargement progressif (scroll infini) avec limitation du nombre de recettes affichées initialement.*

## 🛠️ Installation et lancement
1. **Cloner le dépôt** :
   ```bash
   git clone [https://github.com/ElChahine/FW_LivreDeRecettes.git](https://github.com/ElChahine/FW_LivreDeRecettes.git)
   cd FW_LivreDeRecettes