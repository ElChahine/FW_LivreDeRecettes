<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useLibraryStore } from '../stores/libraries';

// Récupère les stores d'authentification et de gestion des bibliothèques
const authStore = useAuthStore();
const libStore = useLibraryStore();
const newLibName = ref('');

// Propriété calculée qui liste les bibliothèques du compte actif
const myLibraries = computed(() => libStore.libraries[authStore.user?.name] || []);

// Fonction de création d'une nouvelle bibliothèque
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
          <router-link :to="{ name: 'LibraryDetail', params: { id: lib.id } }" class="lib-link">
            <h4>{{ lib.name }} ({{ lib.recipes.length }} recettes)</h4>
          </router-link>
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

/* Container principal du profil utilisateur */
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header h1 span {
  color: #42b883;
}

.add-library-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 3rem;
  border: 1px solid #eee;
}

.add-library-section h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.input-group {
  display: flex;
  gap: 15px;
}

input {
  flex: 1;
  padding: 12px 18px;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

.create-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0 25px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}

.create-btn:hover {
  background: #33a06f;
  transform: translateY(-2px);
}

.libraries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.library-card {
  background: white;
  padding: 1.8rem;
  border-radius: 18px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.library-card:hover {
  transform: translateY(-5px);
}

.lib-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.lib-link {
  text-decoration: none;
  color: #2c3e50;
}

.lib-link h4 {
  margin: 0;
  font-size: 1.25rem;
}

.lib-link h4 span {
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: normal;
}

.lib-link:hover h4 {
  color: #42b883;
}


.delete-btn {
  background: #fee2e2;
  color: #ef4444;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #fecaca;
}


.recipe-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recipe-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f8f9fa;
}

.recipe-item:last-child {
  border-bottom: none;
}

.recipe-title {
  font-size: 0.95rem;
  color: #475569;
}

.remove-recipe-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.3s;
}

.remove-recipe-btn:hover {
  color: #ef4444;
}
</style>