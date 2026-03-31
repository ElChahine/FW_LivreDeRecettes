<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLibraryStore } from '../stores/libraries';
import { useAuthStore } from '../stores/auth';
import RecipeCard from '../components/RecipeCard.vue';

/**
 * LOGIQUE DE RÉCUPÉRATION DES DONNÉES
 */
const route = useRoute();
const libStore = useLibraryStore();
const authStore = useAuthStore();

// On récupère la bibliothèque spécifique grâce à l'ID passé dans l'URL
const library = computed(() => {
  const userLibs = libStore.libraries[authStore.user?.name] || [];
  // On compare l'ID du paramètre d'URL avec les IDs des bibliothèques
  return userLibs.find(l => l.id === parseInt(route.params.id));
});
</script>

<template>
  <div v-if="library" class="library-page">
    
    <header class="library-header">
      <router-link to="/profil" class="back-link">
        ← Retour à mon profil
      </router-link>
      <h1>{{ library.name }}</h1>
      <p class="stats">{{ library.recipes.length }} recette(s) dans cette collection</p>
    </header>

    <main v-if="library.recipes.length > 0" class="recipe-grid">
      <RecipeCard 
        v-for="recipe in library.recipes" 
        :key="recipe.id" 
        :recipe="recipe" 
      />
    </main>

    <div v-else class="empty-state">
      <div class="icon">🍳</div>
      <p>Vous n'avez pas encore ajouté de recettes ici.</p>
      <router-link to="/recettes" class="browse-link">Parcourir les recettes</router-link>
    </div>

  </div>

  <div v-else class="error-container">
    <h2>Oups ! Bibliothèque introuvable.</h2>
    <router-link to="/profil">Retourner au profil</router-link>
  </div>
</template>

<style scoped>
/**
 * MISE EN PAGE
 */
.library-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.library-header {
  text-align: center;
  margin-bottom: 4rem;
}

.library-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 1rem 0;
}

.stats {
  color: #94a3b8;
  font-size: 1.1rem;
}

.back-link {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.3s;
}

.back-link:hover {
  opacity: 0.7;
}

/**
 * GRILLE (Identique à votre page d'accueil)
 */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}


.empty-state, .error-container {
  text-align: center;
  padding: 5rem 2rem;
  background: #f8f9fa;
  border-radius: 20px;
}

.empty-state .icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.browse-link {
  display: inline-block;
  margin-top: 1.5rem;
  background: #42b883;
  color: white;
  padding: 12px 25px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
}
</style>