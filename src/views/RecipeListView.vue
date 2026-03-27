<script setup>
import { ref, computed } from 'vue';
import { recipes } from '../data/recipes.js';
import RecipeCard from '../components/RecipeCard.vue'; // 1. On importe le composant enfant

const searchQuery = ref('');

// Propriété calculée pour filtrer la liste en temps réel
const filteredRecipes = computed(() => {
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <h1>Nos Recettes</h1>
    
    <input 
      v-model="searchQuery" 
      placeholder="Rechercher une recette..."
      class="search-bar"
    >

    <div class="recipe-grid">
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