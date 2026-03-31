<script setup>
import { computed } from 'vue';
import { useFavoriteStore } from '../stores/favorites';
import { useAuthStore } from '../stores/auth'; 
import { useLibraryStore } from '../stores/libraries'; 

const props = defineProps(['recipe']);

const favoriteStore = useFavoriteStore();
const authStore = useAuthStore();
const libStore = useLibraryStore();

// Obtient la liste des collections de l'utilisateur en temps réel
const myLibraries = computed(() => libStore.libraries[authStore.user?.name] || []);

// Vérifie si la recette affichée est déjà rangée dans la bibliothèque demandée
const isRecipeInLibrary = (libId) => {
  const lib = myLibraries.value.find(l => l.id === libId);
  return lib ? lib.recipes.some(r => r.id === props.recipe.id) : false;
};

// Gère la sélection d'une bibliothèque dans la liste déroulante
const handleAdd = (event) => {
  const libId = parseInt(event.target.value);
  if (libId) {
    libStore.addRecipeToLibrary(libId, props.recipe);
    event.target.value = ""; // Remet le menu sur "Ajouter à une collection..."
    alert('Recette ajoutée à votre collection !');
  }
};
</script>

<template>
  <div class="recipe-card">
    <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
    
    <div class="recipe-content">
      <h3>{{ recipe.title }}</h3>
      <p class="category">{{ recipe.description }}</p>

      <div v-if="authStore.user" class="library-section">
        <select @change="handleAdd" class="library-select">
          <option value="" disabled selected>📁 Ajouter à une collection...</option>
          <option 
            v-for="lib in myLibraries" 
            :key="lib.id" 
            :value="lib.id"
            :disabled="isRecipeInLibrary(lib.id)"
          >
            {{ lib.name }} {{ isRecipeInLibrary(lib.id) ? '(Déjà ajoutée)' : '' }}
          </option>
        </select>
      </div>
      
      <div class="card-footer">
        <router-link :to="{ name: 'RecipeDetail', params: { id: recipe.id } }" class="view-link">
          Voir la recette
        </router-link>
        
        <button @click="favoriteStore.toggleFavorite(recipe.id)" class="fav-btn">
          {{ favoriteStore.isFavorite(recipe.id) ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.category {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.library-section {
  margin-bottom: 1.2rem;
}

.library-select {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ecf0f1;
  background-color: #f9f9f9;
  font-size: 0.85rem;
  color: #7f8c8d;
  cursor: pointer;
}

.library-select:focus {
  outline: none;
  border-color: #42b983;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
</style>