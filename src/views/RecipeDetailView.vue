<script setup>
import { useRoute } from 'vue-router';
import { recipes } from '../data/recipes.js';

const route = useRoute();
// On cherche dans notre tableau la recette qui correspond à l'ID de l'URL
const recipe = recipes.find(r => r.id === parseInt(route.params.id));
</script>

<template>
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <p><em>{{ recipe.description }}</em></p>
    
    <h3>Ingrédients :</h3>
    <ul>
      <li v-for="ing in recipe.ingredients" :key="ing">{{ ing }}</li>
    </ul>

    <h3>Instructions :</h3>
    <p>{{ recipe.instructions }}</p>

    <router-link to="/recettes">← Retour à la liste</router-link>
  </div>
  <div v-else>
    <p>Recette introuvable.</p>
  </div>
</template>