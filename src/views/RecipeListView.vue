<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.vue';
import { useFavoriteStore } from '../stores/favorites';

// États
const recipes = ref([]); // Liste alphabétique
const searchResults = ref([]); // Résultats de recherche API
const loading = ref(false);
const searchQuery = ref('');
const showFavoritesOnly = ref(false);

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const currentLetterIndex = ref(0);
const favoriteStore = useFavoriteStore();

/**
 * Recherche Globale via l'API
 * S'exécute dès que searchQuery change
 */
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  loading.value = true;
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery.value}`);
    if (response.data.meals) {
      searchResults.value = response.data.meals.map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        description: `${meal.strCategory} - ${meal.strArea}`,
        image: meal.strMealThumb
      }));
    } else {
      searchResults.value = [];
    }
  } catch (error) {
    console.error("Erreur recherche :", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Chargement par lot (Alphabet)
 */
const fetchNextBatch = async () => {
  if (currentLetterIndex.value >= alphabet.length || loading.value || searchQuery.value) return;

  loading.value = true;
  try {
    const letter = alphabet[currentLetterIndex.value];
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    if (response.data.meals) {
      const newMeals = response.data.meals.map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        description: `${meal.strCategory} - ${meal.strArea}`,
        image: meal.strMealThumb
      }));
      recipes.value.push(...newMeals);
    }
    currentLetterIndex.value++;
  } catch (error) {
    console.error("Erreur batch :", error);
  } finally {
    loading.value = false;
  }
};

// Surveiller la barre de recherche
watch(searchQuery, performSearch);

onMounted(fetchNextBatch);

/**
 * Détermine quelle liste afficher (Recherche ou Alphabet)
 * Applique ensuite le filtre favoris si nécessaire
 */
const displayRecipes = computed(() => {
  let baseList = searchQuery.value.trim() ? searchResults.value : recipes.value;

  if (showFavoritesOnly.value) {
    return baseList.filter(recipe => favoriteStore.isFavorite(recipe.id));
  }
  return baseList;
});
</script>

<template>
  <div class="main-container">
    <header class="page-header">
      <h1>Mon Livre de Recettes</h1>
      <div class="search-section">
        <input 
          v-model="searchQuery" 
          placeholder="Chercher une recette (ex: Pizza, Beef, Chocolate...)" 
          class="search-input" 
        />
        <label class="fav-filter">
          <input type="checkbox" v-model="showFavoritesOnly" />
          <span>Afficher mes favoris ❤️</span>
        </label>
      </div>
    </header>

    <div v-if="loading && displayRecipes.length === 0" class="loading-state">
      Chargement en cours...
    </div>

    <main class="recipe-grid">
      <RecipeCard 
        v-for="recipe in displayRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </main>

    <div v-if="displayRecipes.length === 0 && !loading" class="no-results">
      Aucune recette trouvée.
    </div>

    <footer class="footer-actions" v-if="!searchQuery">
      <button 
        v-if="currentLetterIndex < alphabet.length" 
        @click="fetchNextBatch" 
        class="load-btn" 
        :disabled="loading"
      >
        {{ loading ? 'Chargement...' : 'Voir plus de recettes' }}
      </button>
    </footer>
  </div>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1.5rem;
}

.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 0.8rem 1.2rem;
  border: 2px solid #dfe6e9;
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 8px rgba(66, 184, 131, 0.2);
}

.fav-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.loading-state, .no-results {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #636e72;
}

.footer-actions {
  margin-top: 4rem;
  text-align: center;
}

.load-btn {
  background-color: #2d3436;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.load-btn:hover:not(:disabled) {
  transform: scale(1.05);
  background-color: #42b883;
}

.load-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>