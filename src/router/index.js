import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecipeListView from '../views/RecipeListView.vue';
import RecipeDetailView from '../views/RecipeDetailView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import LibraryDetailView from '../views/LibraryDetailView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  // public
  { path: '/', name: 'Home', component: HomeView }, 
  { path: '/login', name: 'Login', component: LoginView }, 
  
  { 
    path: '/recettes', 
    name: 'Recipes', 
    component: RecipeListView,
    meta: { requiresAuth: false } 
  },
  { 
    // Route dynamique avec paramètre ":id"
    path: '/recettes/:id', 
    name: 'RecipeDetail', 
    component: RecipeDetailView,
    meta: { requiresAuth: false } 
  },

  // privées
  { 
    path: '/profil', 
    name: 'Profile', 
    component: ProfileView, 
    meta: { requiresAuth: true } // authentification nécessaire pour accéder à la page
  },
  { 
    path: '/profil/bibliotheque/:id', 
    name: 'LibraryDetail', 
    component: LibraryDetailView, 
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard : Vérifie les accès avant chaque changement de page
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Si la page est marquée "requiresAuth" et que personne n'est connecté
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login'); // Redirection forcée vers la page de connexion
  } else {
    next(); // Autorise le passage
  }
});

export default router;