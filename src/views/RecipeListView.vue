<script setup>
import { ref, onMounted, computed } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';

const recipes = ref([]); // Liste vide au départ
const loading = ref(true); // État de chargement
const searchQuery = ref('');

// Fonction pour récupérer les données de l'API
const fetchRecipes = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    // On adapte les données de l'API à notre format (id, title, description, image)
    recipes.value = data.meals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      description: meal.strCategory + ' - ' + meal.strArea,
      image: meal.strMealThumb
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
  } finally {
    loading.value = false;
  }
};

// On appelle l'API au montage du composant
onMounted(fetchRecipes);

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="recipe-list">
    <h1>Nos Recettes</h1>
    
    <input v-model="searchQuery" placeholder="Rechercher une recette..." class="search-input" />

    <div v-if="loading">Chargement des recettes...</div>
    
    <div v-else class="recipes-container">
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