<template>
  <nav class="navbar">
    <div class="logo">
      <h2>Mon Carnet Gourmand</h2>
    </div>
    <ul class="nav-links">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/recettes">Toutes les recettes</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
// La logique de la barre de navigation ira ici plus tard (ex: barre de recherche)
</script>

<style scoped>
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
</style>