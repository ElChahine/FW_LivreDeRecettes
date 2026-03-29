<script setup>
import { useFavoriteStore } from '../stores/favorites';

const props = defineProps(['recipe']);
const favoriteStore = useFavoriteStore();
</script>

<template>
  <div class="recipe-card">
    <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
    
    <div class="recipe-content">
      <h3>{{ recipe.title }}</h3>
      <p class="category">{{ recipe.description }}</p>
      
      <div class="card-footer">
        <router-link :to="`/recettes/${recipe.id}`" class="view-link">
          Voir la recette
        </router-link>
        
        <button @click="favoriteStore.toggleFavorite(recipe.id)" class="fav-btn">
          {{ favoriteStore.isFavorite(recipe.id) ? '❤️' : '🤍' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  background: white;
  border-radius: 15px;
  overflow: hidden; /* Pour que l'image suive l'arrondi de la carte */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover; /* Important : l'image remplit le cadre sans être déformée */
}

.recipe-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.category {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0;
}
</style>