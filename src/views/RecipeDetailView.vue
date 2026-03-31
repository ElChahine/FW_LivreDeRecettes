<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

/**
 * LOGIQUE DU COMPOSANT
 */
const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const ingredients = ref([]);

/**
 * RÉCUPÉRATION DES DÉTAILS
 */
const fetchRecipeDetail = async () => {
  try {
    const recipeId = route.params.id; 
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const meal = response.data.meals[0]; 
    
    if (meal) {
      recipe.value = {
        title: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        image: meal.strMealThumb
      };

      // Extraction des ingrédients et mesures
      const extractedIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim() !== '') {
          extractedIngredients.push({
            name: ingredient.trim(),
            measure: measure ? measure.trim() : ''
          });
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

/**
 * AMÉLIORATION : Découpage des instructions en étapes numérotées
 * On utilise une propriété calculée pour transformer le gros bloc de texte en tableau
 */
const formattedSteps = computed(() => {
  if (!recipe.value || !recipe.value.instructions) return [];
  
  // On découpe par point suivi d'un espace ou par retour à la ligne
  return recipe.value.instructions
    .split(/\r\n|\n|\r|(?<=\.) /)
    .filter(step => step.trim().length > 5); // On ignore les lignes vides ou trop courtes
});

onMounted(fetchRecipeDetail);
</script>

<template>
  <div class="recipe-container">
    <div v-if="loading" class="loader">
      <div class="spinner"></div>
      <p>Préparation de votre fiche recette...</p>
    </div>
    
    <div v-else-if="recipe" class="recipe-content">
      <router-link to="/recettes" class="back-button">← Retour aux recettes</router-link>
      
      <section class="recipe-header">
        <div class="header-image">
          <img :src="recipe.image" :alt="recipe.title" />
          <span class="badge">{{ recipe.category }}</span>
        </div>
        <div class="header-info">
          <h1>{{ recipe.title }}</h1>
          <p class="origin">Cuisine {{ recipe.area }}</p>
          <div class="quick-info">
            <span>⏱ Rapide</span>
            <span>🍳 Facile</span>
            <span>😋 Gourmand</span>
          </div>
        </div>
      </section>

      <div class="recipe-grid">
        
        <aside class="ingredients-section">
          <h3>Ingrédients</h3>
          <ul class="ingredients-list">
            <li v-for="(ing, index) in ingredients" :key="index">
              <span class="measure">{{ ing.measure }}</span>
              <span class="name">{{ ing.name }}</span>
            </li>
          </ul>
        </aside>

        <article class="instructions-section">
          <h3>Instructions de préparation</h3>
          
          <div class="steps-container">
            <div v-for="(step, index) in formattedSteps" :key="index" class="step-card">
              <div class="step-number">{{ index + 1 }}</div>
              <p class="step-text">{{ step }}</p>
            </div>
          </div>
          
          <p v-if="formattedSteps.length === 0" class="instructions-text">
            {{ recipe.instructions }}
          </p>
        </article>
      </div>
    </div>
    
    <div v-else class="error-state">
      <p>Oups ! Cette recette semble s'être envolée.</p>
      <router-link to="/recettes" class="back-button">Retourner à la liste</router-link>
    </div>
  </div>
</template>

<style scoped>
/**
 * REPRISE INTÉGRALE DE TES STYLES
 */
.recipe-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.back-button {
  display: inline-block;
  margin-bottom: 25px;
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.back-button:hover {
  color: #33a06f;
}

/* En-tête */
.recipe-header {
  display: flex;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  margin-bottom: 40px;
  align-items: center;
}

.header-image {
  position: relative;
  flex: 0 0 350px;
}

.header-image img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #42b883;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.header-info h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  color: #1a2a3a;
}

.origin {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.quick-info {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
}

.quick-info span {
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #eee;
}

/* Grille principale */
.recipe-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
}

/* Ingrédients */
.ingredients-section {
  background: #fdfdfd;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #eee;
  height: fit-content;
}

.ingredients-section h3, .instructions-section h3 {
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.ingredients-list {
  list-style: none;
  padding: 0;
}

.ingredients-list li {
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  display: flex;
  justify-content: space-between;
}

.measure {
  font-weight: bold;
  color: #42b883;
}

/* Instructions Améliorées */
.instructions-section {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.03);
}

.step-card {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.step-number {
  background: #42b883;
  color: white;
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-text {
  line-height: 1.7;
  font-size: 1.05rem;
  color: #34495e;
  margin: 0;
}

/* Loader */
.loader {
  text-align: center;
  margin-top: 100px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 900px) {
  .recipe-header {
    flex-direction: column;
    text-align: center;
  }
  .header-image {
    flex: 0 0 auto;
    width: 100%;
  }
  .recipe-grid {
    grid-template-columns: 1fr;
  }
}
</style>