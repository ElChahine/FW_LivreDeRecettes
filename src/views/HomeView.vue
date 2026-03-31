<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import RecipeCard from '../components/RecipeCard.vue';

const authStore = useAuthStore();
const randomRecipes = ref([]);
const loading = ref(true);

const fetchFeaturedRecipes = async () => {
  loading.value = true;
  try {
    const requests = [
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    ];

    const responses = await Promise.all(requests);
    
    randomRecipes.value = responses.map(res => {
      const meal = res.data.meals[0];
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        description: `${meal.strCategory} - ${meal.strArea}`,
        image: meal.strMealThumb
      };
    });
  } catch (error) {
    console.error("Erreur lors du chargement des suggestions :", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchFeaturedRecipes);
</script>

<template>
  <div class="home-view">
    <header class="hero-section">
      <div class="hero-content">
        <h1>Bienvenue sur <span>Mon Carnet Gourmand</span></h1>
        <p v-if="authStore.user">Ravi de vous revoir, <strong>{{ authStore.user.name }}</strong> ! Prêt pour une nouvelle aventure culinaire ? </p>
        <p v-else>Découvrez, cuisinez et organisez vos recettes préférées en quelques clics. </p>
        
        <div class="hero-actions">
          <router-link to="/recettes" class="btn-primary">Explorer les recettes</router-link>
          <router-link v-if="!authStore.user" to="/login" class="btn-secondary">Se connecter</router-link> 
          <router-link v-else to="/profil" class="btn-secondary">Voir mon profil</router-link> 
        </div>
      </div>
    </header>

    <section class="featured-section">
      <div class="section-header">
        <h2>✨ Sélection du moment</h2>
        <button @click="fetchFeaturedRecipes" class="refresh-btn" :disabled="loading">
          {{ loading ? 'Chargement...' : 'Nouvelles idées 🔄' }}
        </button>
      </div>

      <div v-if="loading" class="loading-grid">
        <p>Recherche de saveurs...</p>
      </div>

      <div v-else class="recipe-grid">
        <RecipeCard 
          v-for="recipe in randomRecipes" 
          :key="recipe.id" 
          :recipe="recipe" 
        />
      </div>
    </section>

    <section class="about-section">
      <div class="about-card">
        <h3>📖 Votre carnet personnel</h3>
        <p>Ne perdez plus jamais une idée de repas. Créez vos propres bibliothèques thématiques et retrouvez vos plats favoris en un instant.</p>
      </div>
      <div class="about-card">
        <h3>🌍 Cuisine du monde</h3>
        <p>Accédez à des centaines de recettes provenant de toutes les cultures, directement depuis l'API TheMealDB.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero Section  */
.hero-section {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), 
              url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=1000');
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  margin-bottom: 4rem;
}

.hero-section h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.hero-section h1 span {
  color: #42b883;
}

.hero-section p {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn-primary {
  background: #42b883;
  color: white;
  padding: 12px 25px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-secondary {
  background: white;
  color: #2c3e50;
  border: 2px solid #e2e8f0;
  padding: 12px 25px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
}

.btn-primary:hover { transform: translateY(-3px); }

/* Suggestions Section  */
.featured-section {
  margin-bottom: 4rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.refresh-btn {
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

/* About Section  */
.about-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.about-card {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 15px;
  text-align: center;
}

.about-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}
</style>