import { defineStore } from 'pinia';

// Création du store Pinia pour gérer l'état global des recettes favorites
export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: [] // Stocke uniquement les IDs des recettes mises en favoris
  }),
  actions: {
    // Ajoute l'ID s'il n'existe pas, ou le retire s'il est déjà présent
    toggleFavorite(recipeId) {
      const index = this.favorites.indexOf(recipeId);
      if (index > -1) {
        this.favorites.splice(index, 1); 
      } else {
        this.favorites.push(recipeId); 
      }
    }
  },
  getters: {
    // Permet aux composants de vérifier rapidement si une recette est likée
    isFavorite: (state) => (id) => state.favorites.includes(id) 
  }
});