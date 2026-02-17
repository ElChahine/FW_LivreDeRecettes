import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipeListView from '../views/RecipeListView.vue';
import RecipeDetailView from '../views/RecipeDetailView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/recettes', name: 'Recipes', component: RecipeListView },
  // Route dynamique pour le détail d'une recette (ex: /recettes/123)
  { path: '/recettes/:id', name: 'RecipeDetail', component: RecipeDetailView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;