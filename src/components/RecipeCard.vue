<script setup>
import { useFavoriteStore } from '../stores/favorites'; 

// Récupération des données transmises par le composant parent (RecipeListView)
const props = defineProps(['recipe']);

// Initialisation du store pour pouvoir utiliser l'action toggleFavorite
const favoriteStore = useFavoriteStore(); 
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