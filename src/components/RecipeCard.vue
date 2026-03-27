<script setup>
// On déclare la prop "recipe" pour recevoir l'objet complet depuis le parent
defineProps({
  recipe: {
    type: Object,
    required: true // Sécurité : on exige que le parent fournisse cette donnée
  }
});
</script>

<template>
  <div class="card">
    <h3>{{ recipe.title }}</h3>
    <p v-if="recipe.description" class="preview-text">
      {{ recipe.description }}
    </p>
    
    <router-link :to="`/recettes/${recipe.id}`">Voir la recette</router-link>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s; /* Petite animation sympa */
}

.card:hover {
  transform: translateY(-5px);
}

.preview-text {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}
</style>