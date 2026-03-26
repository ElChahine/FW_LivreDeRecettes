<script setup>
import { ref, computed } from 'vue';
import { recipes } from '../data/recipes.js';

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
      <div v-for="recipe in filteredRecipes" :key="recipe.id" class="card">
        <h3>{{ recipe.title }}</h3>
        <router-link :to="`/recettes/${recipe.id}`">Voir la recette</router-link>
      </div>
    </div>
  </div>
</template>