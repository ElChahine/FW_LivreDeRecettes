<template>
  <div>
    <h1>Détail de la recette</h1>
    <p>Vous consultez actuellement la recette numéro : {{ recipeId }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const recipeId = route.params.id; // Récupère le paramètre depuis l'URL
</script>