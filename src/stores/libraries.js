import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useLibraryStore = defineStore('libraries', {
  state: () => ({
    // Structure : { "nom_utilisateur": [ { id, name, recipes: [] } ] }
    libraries: JSON.parse(localStorage.getItem('user_libraries')) || {}
  }),
  actions: {
    saveToStorage() {
      localStorage.setItem('user_libraries', JSON.stringify(this.libraries));
    },
    
    createLibrary(name) {
      const authStore = useAuthStore();
      if (!authStore.user) return;
      
      const username = authStore.user.name;
      if (!this.libraries[username]) this.libraries[username] = [];
      
      this.libraries[username].push({
        id: Date.now(),
        name: name,
        recipes: []
      });
      this.saveToStorage();
    },

    deleteLibrary(libraryId) {
      const authStore = useAuthStore();
      const username = authStore.user.name;
      this.libraries[username] = this.libraries[username].filter(l => l.id !== libraryId);
      this.saveToStorage();
    },

    addRecipeToLibrary(libraryId, recipe) {
      const authStore = useAuthStore();
      const lib = this.libraries[authStore.user.name].find(l => l.id === libraryId);
      if (lib && !lib.recipes.find(r => r.id === recipe.id)) {
        lib.recipes.push(recipe);
        this.saveToStorage();
      }
    },

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