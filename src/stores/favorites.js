import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: [] // Liste des IDs de recettes favorites
  }),
  actions: {
    toggleFavorite(recipeId) {
      const index = this.favorites.indexOf(recipeId);
      if (index > -1) {
        this.favorites.splice(index, 1); // Retirer si déjà présent
      } else {
        this.favorites.push(recipeId); // Ajouter sinon
      }
    }
  },
  getters: {
    isFavorite: (state) => (id) => state.favorites.includes(id) // Vérifier si favori
  }
});