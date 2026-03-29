<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// useRoute permet d'accéder aux paramètres de l'URL actuelle
const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const ingredients = ref([]);

const fetchRecipeDetail = async () => {
  try {
    // Extraction de l'ID passé dynamiquement dans la route
    const recipeId = route.params.id; 
    
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const meal = response.data.meals[0]; 
    
    if (meal) {
      recipe.value = {
        title: meal.strMeal,
        description: meal.strCategory + ' - ' + meal.strArea,
        instructions: meal.strInstructions,
        image: meal.strMealThumb
      };

      // L'API retourne les ingrédients dans des champs séparés (strIngredient1 à 20)
      // On boucle sur ces champs pour générer un tableau propre
      const extractedIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
          extractedIngredients.push(`${measure} ${ingredient}`.trim());
        }
      }
      ingredients.value = extractedIngredients;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchRecipeDetail);
</script>

<template>
  <div class="container">
    <div v-if="loading">
      <p>Chargement de la recette...</p>
    </div>
    
    <div v-else-if="recipe">
      <router-link to="/recettes" class="back-link">← Retour à la liste</router-link>
      
      <h1>{{ recipe.title }}</h1>
      <p><em>{{ recipe.description }}</em></p>
      
      <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />

      <h3>Ingrédients :</h3>
      <ul>
        <li v-for="(ing, index) in ingredients" :key="index">{{ ing }}</li>
      </ul>

      <h3>Instructions :</h3>
      <p class="instructions">{{ recipe.instructions }}</p>
    </div>
    
    <div v-else>
      <p>Recette introuvable.</p>
      <router-link to="/recettes" class="back-link">← Retour à la liste</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.recipe-image {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.instructions {
  white-space: pre-line;
  line-height: 1.6;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #42b883;
  text-decoration: none;
  font-weight: bold;
}
</style>