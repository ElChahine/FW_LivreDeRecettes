<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const recipe = ref(null);
const loading = ref(true);

const fetchRecipeDetail = async () => {
  try {
    // On utilise l'ID de l'URL pour demander les détails à l'API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
    const data = await response.json();
    
    if (data.meals) {
      const meal = data.meals[0];
      // On prépare l'objet recette avec les données de l'API
      recipe.value = {
        title: meal.strMeal,
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea
      };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du détail :", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRecipeDetail);
</script>

<template>
  <div v-if="loading">Chargement des détails...</div>
  
  <div v-else-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" :alt="recipe.title" style="width: 300px; border-radius: 10px;" />
    
    <p><strong>Catégorie :</strong> {{ recipe.category }} ({{ recipe.area }})</p>
    
    <h3>Instructions de préparation :</h3>
    <p style="white-space: pre-line;">{{ recipe.instructions }}</p>

    <router-link to="/recettes">← Retour à la liste</router-link>
  </div>
  
  <div v-else>
    <p>Recette introuvable ou erreur de chargement.</p>
    <router-link to="/recettes">Retour à la liste</router-link>
  </div>
</template>