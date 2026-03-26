# Mon Carnet Gourmand - Projet Vue.js

## Objectif
Création d'une application de livre de recettes interactive permettant de consulter une liste de plats et leurs détails.

## Fonctionnalités principales
- Affichage d'une liste dynamique de recettes.
- Consultation du détail d'une recette via un itinéraire (route) spécifique.
- [À ajouter : Barre de recherche / Système de favoris]

## Difficultés rencontrées et solutions
1. **Erreur 404 au lancement** : Le serveur Vite ne trouvait pas de point d'entrée. *Solution : Ajout d'un fichier `index.html` à la racine.*
2. **Erreur de syntaxe JS sur les fichiers .vue** : Vite ne gérait pas les composants Vue par défaut. *Solution : Création du fichier `vite.config.js` et installation du plugin `@vitejs/plugin-vue`.*
3. **Erreurs d'importation du routeur** : Conflit de nommage entre le dossier `routeur` et l'import `router`. *Solution : Renommage du dossier pour uniformiser le code.*

## Installation et lancement
1. Cloner le dépôt.
2. Installer les dépendances : `npm install`
3. Lancer le projet : `npm run dev`