<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.vue';
import { useFavoriteStore } from '../stores/favorites';

// Variables d'état réactives
const recipes = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showFavoritesOnly = ref(false);

const favoriteStore = useFavoriteStore(); 

// Appel API pour récupérer la liste par défaut des recettes
const fetchRecipes = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    
    // Formatage des données reçues pour correspondre à notre structure de composant
    recipes.value = response.data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strCategory + ' - ' + meal.strArea,
      image: meal.strMealThumb
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste :", error);
  } finally {
    loading.value = false;
  }
};

// Exécution de la requête HTTP dès que le composant est inséré dans le DOM
onMounted(fetchRecipes);

// Propriété calculée retournant la liste filtrée (mise à jour automatique si la recherche ou les favoris changent)
const filteredRecipes = computed(() => {
  let result = recipes.value;

  if (searchQuery.value) {
    result = result.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (showFavoritesOnly.value) {
    result = result.filter(recipe => favoriteStore.isFavorite(recipe.id));
  }

  return result;
});
</script>

<template>
  <div class="recipe-list">
    <h1>Nos Recettes</h1>
    
    <div class="filters">
      <input 
        v-model="searchQuery" 
        placeholder="Rechercher une recette..." 
        class="search-bar" 
      />
      
      <label class="favorite-toggle">
        <input type="checkbox" v-model="showFavoritesOnly" />
        Afficher uniquement mes favoris ❤️
      </label>
    </div>

    <div v-if="loading">Chargement des recettes...</div>
    
    <div v-else-if="filteredRecipes.length === 0" class="no-results">
      <p>Aucune recette trouvée avec ces filtres.</p>
    </div>
    
    <div v-else class="recipe-grid">
      <RecipeCard 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin-bottom: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.favorite-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
}

.no-results {
  text-align: center;
  color: #666;
  font-style: italic;
  margin-top: 2rem;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.recipes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style>