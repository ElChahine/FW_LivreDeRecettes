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
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
main {
  padding: 2rem;
}
</style>