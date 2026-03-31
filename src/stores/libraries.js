import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useLibraryStore = defineStore('libraries', {
  state: () => ({
    libraries: JSON.parse(localStorage.getItem('user_libraries')) || {}
  }),
  actions: {
    //éviter la répétition de la sauvegarde
    saveToStorage() {
      localStorage.setItem('user_libraries', JSON.stringify(this.libraries));
    },
    
    // Crée une nouvelle collection vide
    createLibrary(name) {
      const authStore = useAuthStore();
      if (!authStore.user) return;
      
      const username = authStore.user.name;
      
      // Initialise l'espace utilisateur s'il n'existe pas
      if (!this.libraries[username]) this.libraries[username] = [];
      
      this.libraries[username].push({
        id: Date.now(), // Génère un ID unique basé sur l'heure
        name: name,
        recipes: []
      });
      this.saveToStorage();
    },

    // Supprime une collection entière via son ID
    deleteLibrary(libraryId) {
      const authStore = useAuthStore();
      const username = authStore.user.name;
      // On filtre le tableau pour garder toutes les bibliothèques SAUF celle ciblée
      this.libraries[username] = this.libraries[username].filter(l => l.id !== libraryId);
      this.saveToStorage();
    },

    // permet de mettre une recette dans une bibliothèque
    addRecipeToLibrary(libraryId, recipe) {
      const authStore = useAuthStore();
      const lib = this.libraries[authStore.user.name].find(l => l.id === libraryId);
      
      // Vérifie que la collection existe et que la recette n'est pas déjà dedans
      if (lib && !lib.recipes.find(r => r.id === recipe.id)) {
        lib.recipes.push(recipe);
        this.saveToStorage();
      }
    },

    // Retire une recette spécifique d'une collection
    removeRecipeFromLibrary(libraryId, recipeId) {
      const authStore = useAuthStore();
      const lib = this.libraries[authStore.user.name].find(l => l.id === libraryId);
      if (lib) {
        lib.recipes = lib.recipes.filter(r => r.id !== recipeId);
        this.saveToStorage();
      }
    }
  }
});