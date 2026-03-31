<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useLibraryStore } from '../stores/libraries';

const authStore = useAuthStore();
const libStore = useLibraryStore();
const newLibName = ref('');

// Récupère les bibliothèques de l'utilisateur connecté 
const myLibraries = computed(() => libStore.libraries[authStore.user?.name] || []);

const handleCreate = () => {
  if (newLibName.value.trim()) {
    libStore.createLibrary(newLibName.value);
    newLibName.value = '';
  }
};
</script>

<template>
  <div class="profile-container">
    <h1>Mon Espace : {{ authStore.user?.name }}</h1>

    <section class="add-library">
      <h3>Créer une nouvelle bibliothèque</h3>
      <div class="input-group">
        <input v-model="newLibName" placeholder="Nom (ex: Mes envies)" @keyup.enter="handleCreate" />
        <button @click="handleCreate">Créer</button>
      </div>
    </section>

    <div class="libraries-grid">
      <div v-for="lib in myLibraries" :key="lib.id" class="library-card">
        <div class="lib-header">
          <h4>{{ lib.name }} ({{ lib.recipes.length }} recettes)</h4>
          <button class="delete-btn" @click="libStore.deleteLibrary(lib.id)">Supprimer</button>
        </div>
        
        <ul class="recipe-list">
          <li v-for="recipe in lib.recipes" :key="recipe.id">
            {{ recipe.title }}
            <button @click="libStore.removeRecipeFromLibrary(lib.id, recipe.id)">×</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
.add-library { background: #f4f4f4; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; }
.input-group { display: flex; gap: 10px; }
input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid #ddd; }
button { background: #42b883; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.libraries-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.library-card { border: 1px solid #eee; padding: 1.5rem; border-radius: 12px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.lib-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; margin-bottom: 1rem; }
.delete-btn { background: #e74c3c; font-size: 0.8rem; }
.recipe-list { list-style: none; padding: 0; }
.recipe-list li { display: flex; justify-content: space-between; padding: 5px 0; font-size: 0.9rem; border-bottom: 1px dashed #eee; }
</style>