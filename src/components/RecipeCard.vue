<script setup>
import { useFavoriteStore } from '../stores/favorites'; // Import du store

const props = defineProps(['recipe']);
const favoriteStore = useFavoriteStore(); // Utilisation du store
</script>

<template>
  <div class="recipe-card">
    <h3>{{ recipe.title }}</h3>
    <p>{{ recipe.description }}</p>
    
    <button @click="favoriteStore.toggleFavorite(recipe.id)">
      {{ favoriteStore.isFavorite(recipe.id) ? '❤️ Retirer' : '🤍 Favori' }}
    </button>

    <router-link :to="`/recettes/${recipe.id}`">Voir la recette</router-link>
  </div>
</template>