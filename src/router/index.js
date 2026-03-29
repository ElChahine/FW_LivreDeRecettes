import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipeListView from '../views/RecipeListView.vue';
import RecipeDetailView from '../views/RecipeDetailView.vue';

// Configuration des routes de l'application
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/recettes', name: 'Recipes', component: RecipeListView },
  // Route dynamique paramétrée (:id) pour afficher le détail d'une recette spécifique
  { path: '/recettes/:id', name: 'RecipeDetail', component: RecipeDetailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;