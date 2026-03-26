<script setup>
import { recipes } from '../data/recipes.js'; // On importe nos données simulées
</script>

<template>
  <div class="container">
    <h1>Nos Recettes</h1>
    <div class="recipe-grid">
      <div v-for="recipe in recipes" :key="recipe.id" class="card">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recettes/${recipe.id}`">Voir la recette</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid #ddd; padding: 1rem; margin: 10px 0; border-radius: 8px; }
</style>