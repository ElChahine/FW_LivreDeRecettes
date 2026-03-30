<template>
  <nav class="navbar">
    <div class="logo">
      <h2>Mon Carnet Gourmand</h2>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/recettes">Toutes les recettes</router-link></li>
      
      <template v-if="authStore.user">
        <li class="user-greeting">
          <span>Bonjour, {{ authStore.user.name }}</span>
        </li>
        <li>
          <button @click="handleLogout" class="logout-btn">Déconnexion</button>
        </li>
      </template>
      <template v-else>
        <li><router-link to="/login">Connexion</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

// On appelle le store d'authentification et le routeur
const authStore = useAuthStore();
const router = useRouter();

// Fonction de déconnexion
const handleLogout = () => {
  authStore.logout();
  router.push('/login'); // On renvoie l'utilisateur vers la page de connexion
};
</script>

<style scoped>
/* --- TON CSS D'ORIGINE INTACT --- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}
.nav-links {
  list-style: none;
  display: flex;
  align-items: center; /* Permet d'aligner le bouton de déconnexion avec les liens */
  gap: 1.5rem;
}
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.nav-links a.router-link-active {
  color: #d97706; /* Couleur active pour savoir sur quelle page on est */
}

nav {
  background-color: rgba(45, 90, 39, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.3s;
}

nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

/* --- AJOUTS UNIQUEMENT POUR LA CONNEXION --- */
.user-greeting span {
  color: white;
  font-weight: 500;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
  font-family: inherit;
  font-size: 1rem;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>