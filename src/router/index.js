import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipeListView from '../views/RecipeListView.vue';
import RecipeDetailView from '../views/RecipeDetailView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', name: 'Home', component: HomeView }, // Public
  { path: '/login', name: 'Login', component: LoginView }, // Public
  
  // On ajoute une balise "meta" pour signaler que ces routes sont privées
  { 
    path: '/recettes', 
    name: 'Recipes', 
    component: RecipeListView,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/recettes/:id', 
    name: 'RecipeDetail', 
    component: RecipeDetailView,
    meta: { requiresAuth: false } 
  }
  { 
    path: '/profil', 
    name: 'Profile', 
    component: ProfileView, 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // On appelle le store pour vérifier si quelqu'un est connecté
  const authStore = useAuthStore();

  // Si la page où on veut aller (to) possède la balise requiresAuth
  // et que personne n'est connecté (!authStore.user)
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login'); // On bloque et on redirige vers la connexion
  } else {
    next(); // Sinon, tout va bien, on le laisse passer
  }
});

export default router;