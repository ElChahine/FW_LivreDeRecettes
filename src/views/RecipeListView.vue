<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard.vue';

const recipes = ref([]);
const loading = ref(true);
const searchQuery = ref('');

// On récupère toutes les recettes au chargement de la page
const fetchRecipes = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    
    // On formate les données de l'API pour que ça rentre bien dans notre composant carte
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

onMounted(fetchRecipes);

// On filtre le tableau selon ce que l'utilisateur tape
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="recipe-list">
    <h1>Nos Recettes</h1>
    
    <input v-model="searchQuery" placeholder="Rechercher une recette..." class="search-bar" />

    <div v-if="loading">Chargement des recettes...</div>
    
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
.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>