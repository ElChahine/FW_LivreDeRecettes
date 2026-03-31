import { defineStore } from 'pinia';
import { useAuthStore } from './auth'; // 1. On importe l'authentification

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    // On charge l'historique des favoris depuis le navigateur, ou on crée un objet vide
    allFavorites: JSON.parse(localStorage.getItem('app_favorites')) || {} 
  }),
  actions: {
    toggleFavorite(recipeId) {
      const authStore = useAuthStore();
      const username = authStore.user?.username;

      if (!username) return; // Sécurité : impossible de liker sans être connecté

      // Si l'utilisateur n'a pas encore de tiroir à favoris, on lui en crée un
      if (!this.allFavorites[username]) {
        this.allFavorites[username] = [];
      }

      // On manipule uniquement le tableau du compte connecté
      const userFavs = this.allFavorites[username];
      const index = userFavs.indexOf(recipeId);
      
      if (index > -1) {
        userFavs.splice(index, 1); 
      } else {
        userFavs.push(recipeId); 
      }

      // On sauvegarde la modification dans le navigateur
      localStorage.setItem('app_favorites', JSON.stringify(this.allFavorites));
    }
  },
  getters: {
    isFavorite: (state) => (id) => {
      const authStore = useAuthStore();
      const username = authStore.user?.username;
      
      // Si l'utilisateur a des favoris, on vérifie si l'ID est dedans
      if (username && state.allFavorites[username]) {
        return state.allFavorites[username].includes(id);
      }
      return false;
    }
  }
});