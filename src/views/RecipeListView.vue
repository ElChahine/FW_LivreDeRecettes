<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.vue';
import { useFavoriteStore } from '../stores/favorites';

// États existants pour la gestion de la liste
const recipes = ref([]); // Liste alphabétique
const searchResults = ref([]); // Résultats de recherche API
const loading = ref(false);
const searchQuery = ref('');
const showFavoritesOnly = ref(false);

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const currentLetterIndex = ref(0);
const favoriteStore = useFavoriteStore();

// Nouveaux états pour les filtres
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
 * Chargement par lot progressif
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
 * Détermine quelle liste afficher selon les actions de l'utilisateur
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
/* Harmonisation avec ProfileView : max-width 1000px et espacement aéré */
.main-container { 
  max-width: 1000px; 
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
  color: #2c3e50; 
  margin-bottom: 1.5rem; 
}

/* Accent vert sur le titre comme dans le profil */
h1::after {
  content: " .";
  color: #42b883;
}

.search-section { 
  background: #f8f9fa; 
  padding: 2rem; 
  border-radius: 15px; 
  border: 1px solid #eee;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 1.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.search-input {
  width: 100%; 
  max-width: 600px; 
  padding: 12px 18px;
  border: 2px solid #e2e8f0; 
  border-radius: 10px; 
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

/* Filtres de catégories plus aérés */
.categories-filter {
  display: flex; 
  gap: 12px; 
  overflow-x: auto; 
  width: 100%; 
  max-width: 800px;
  padding: 10px 0; 
  scrollbar-width: none;
}

.categories-filter::-webkit-scrollbar { display: none; }

.categories-filter button {
  padding: 10px 20px; 
  border-radius: 50px; 
  border: 1px solid #eee;
  background: white; 
  color: #7f8c8d;
  cursor: pointer; 
  white-space: nowrap; 
  transition: all 0.3s;
  font-weight: 500;
}

.categories-filter button:hover {
  border-color: #42b883;
  color: #42b883;
}

.categories-filter button.active { 
  background: #42b883; 
  color: white; 
  border-color: #42b883; 
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.2);
}

.fav-filter { 
  display: flex; 
  align-items: center; 
  gap: 0.8rem; 
  font-weight: 600; 
  cursor: pointer; 
  color: #2c3e50;
}

/* Grille de recettes avec un espacement plus important */
.recipe-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 2.5rem; 
}

/* Animation de chargement*/
.skeleton-card { 
  height: 350px; 
  background: #f0f0f0; 
  border-radius: 18px; 
  animation: pulse 1.5s infinite; 
}

@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.loading-state, .no-results { 
  text-align: center; 
  padding: 4rem; 
  color: #636e72; 
  font-size: 1.1rem;
}

.footer-actions {
  margin-top: 5rem; 
  text-align: center; 
}

/* Bouton "Voir plus" harmonisé */
.load-btn { 
  background-color: #2c3e50; 
  color: white; 
  border: none; 
  padding: 1.2rem 3rem; 
  border-radius: 50px; 
  cursor: pointer; 
  font-weight: bold; 
  transition: all 0.3s;
}

.load-btn:hover {
  background-color: #42b883;
  transform: translateY(-2px);
}

.load-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>