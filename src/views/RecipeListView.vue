<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.vue';
import { useFavoriteStore } from '../stores/favorites';

// États existants
const recipes = ref([]); // Liste alphabétique
const searchResults = ref([]); // Résultats de recherche API
const loading = ref(false);
const searchQuery = ref('');
const showFavoritesOnly = ref(false);

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const currentLetterIndex = ref(0);
const favoriteStore = useFavoriteStore();

// NOUVEAUX ÉTATS POUR LES FILTRES
const categories = ref([]);
const selectedCategory = ref('Toutes');
const categoryResults = ref([]);

/**
 * Chargement des catégories pour le filtre
 */
const fetchCategories = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    categories.value = response.data.meals.map(c => c.strCategory);
  } catch (error) {
    console.error("Erreur catégories :", error);
  }
};

/**
 * Filtrage par catégorie
 */
const filterByCategory = async (category) => {
  selectedCategory.value = category;
  if (category === 'Toutes') {
    categoryResults.value = [];
    return;
  }

  loading.value = true;
  searchQuery.value = ''; // On vide la recherche si on filtre par catégorie
  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    categoryResults.value = response.data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: category,
      image: meal.strMealThumb
    }));
  } catch (error) {
    console.error("Erreur filtre catégorie :", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Recherche Globale via l'API
 */
const performSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  selectedCategory.value = 'Toutes'; // On réinitialise la catégorie si on cherche par texte
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
  if (currentLetterIndex.value >= alphabet.length || loading.value || searchQuery.value || selectedCategory.value !== 'Toutes') return;

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

watch(searchQuery, performSearch);

onMounted(() => {
  fetchCategories();
  fetchNextBatch();
});

/**
 * Détermine quelle liste afficher
 */
const displayRecipes = computed(() => {
  let baseList = [];
  
  if (searchQuery.value.trim()) {
    baseList = searchResults.value;
  } else if (selectedCategory.value !== 'Toutes') {
    baseList = categoryResults.value;
  } else {
    baseList = recipes.value;
  }

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
          placeholder="Chercher une recette (ex: Pizza, Beef...)" 
          class="search-input" 
        />
        
        <div class="categories-filter">
          <button 
            :class="{ active: selectedCategory === 'Toutes' }" 
            @click="filterByCategory('Toutes')"
          >Tout</button>
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="{ active: selectedCategory === cat }"
            @click="filterByCategory(cat)"
          >{{ cat }}</button>
        </div>

        <label class="fav-filter">
          <input type="checkbox" v-model="showFavoritesOnly" />
          <span>Afficher mes favoris ❤️</span>
        </label>
      </div>
    </header>

    <div v-if="loading && displayRecipes.length === 0" class="loading-state">
      <div class="skeleton-grid">
        <div v-for="i in 4" :key="i" class="skeleton-card"></div>
      </div>
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

    <footer class="footer-actions" v-if="!searchQuery && selectedCategory === 'Toutes'">
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
.main-container { max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: 'Inter', sans-serif; }
.page-header { text-align: center; margin-bottom: 3rem; }
h1 { font-size: 2.5rem; color: #2d3436; margin-bottom: 1.5rem; }

.search-section { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }

.search-input {
  width: 100%; max-width: 600px; padding: 0.8rem 1.2rem;
  border: 2px solid #dfe6e9; border-radius: 50px; font-size: 1rem;
}

/* STYLE DES CATÉGORIES */
.categories-filter {
  display: flex; gap: 10px; overflow-x: auto; width: 100%; max-width: 800px;
  padding: 10px 0; scrollbar-width: none;
}
.categories-filter::-webkit-scrollbar { display: none; }
.categories-filter button {
  padding: 8px 18px; border-radius: 20px; border: 1px solid #eee;
  background: white; cursor: pointer; white-space: nowrap; transition: 0.3s;
}
.categories-filter button.active { background: #42b883; color: white; border-color: #42b883; }

.fav-filter { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; cursor: pointer; }

.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }

/* SKELETONS */
.skeleton-card { height: 300px; background: #f0f0f0; border-radius: 15px; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.loading-state, .no-results { text-align: center; padding: 3rem; color: #636e72; }
.footer-actions { margin-top: 4rem; text-align: center; }
.load-btn { background-color: #2d3436; color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; cursor: pointer; font-weight: bold; }
</style>