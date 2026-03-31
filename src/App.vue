<template>
  <header>
    <NavigationBar />
  </header>

  <main>
    <router-view />
  </main>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<style>
/* Style global de base */
:root {
  --primary-color: #2d5a27; /* Vert cuisine */
  --secondary-color: #d97706; /* Orange gourmand */
  --bg-color: #fdfbf7;
  --text-color: #1f2937;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>