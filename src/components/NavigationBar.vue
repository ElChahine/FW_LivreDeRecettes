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
</style>