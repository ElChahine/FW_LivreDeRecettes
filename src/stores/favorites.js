import { defineStore } from 'pinia';
import { useAuthStore } from './auth'; 

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    // Les favoris sont stockés par utilisateur dans un objet global
    allFavorites: JSON.parse(localStorage.getItem('app_favorites')) || {} 
  }),
  actions: {
    // Ajoute ou retire l'ID d'une recette des favoris du compte actif
    toggleFavorite(recipeId) {
      const authStore = useAuthStore();
      const username = authStore.user?.username;

      // On empêche les actions si la personne n'est pas connectée
      if (!username) return; 

      // Crée un tableau vide pour l'utilisateur s'il n'en a pas encore
      if (!this.allFavorites[username]) {
        this.allFavorites[username] = [];
      }

      // Cherche l'ID de la recette dans la liste
      const userFavs = this.allFavorites[username];
      const index = userFavs.indexOf(recipeId);
      
      // Si on trouve l'ID, on le supprime (unlike), sinon on l'ajoute (like)
      if (index > -1) {
        userFavs.splice(index, 1); 
      } else {
        userFavs.push(recipeId); 
      }

      // Enregistre la mise à jour dans le navigateur
      localStorage.setItem('app_favorites', JSON.stringify(this.allFavorites));
    }
  },
  getters: {
    // Vérifie si une recette est dans les favoris (utile pour l'affichage du coeur plein/vide)
    isFavorite: (state) => (id) => {
      const authStore = useAuthStore();
      const username = authStore.user?.username;
      
      if (username && state.allFavorites[username]) {
        return state.allFavorites[username].includes(id);
      }
      return false;
    }
  }
});