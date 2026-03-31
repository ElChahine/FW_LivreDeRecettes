<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

// Fonction pour vérifier les identifiants et connecter l'utilisateur
const handleLogin = () => {
  const success = authStore.login(username.value, password.value);
  
  if (success) {
    router.push('/'); // Redirection vers l'accueil si la connexion réussit
  } else {
    errorMessage.value = 'Identifiants incorrects. Essayez admin / 123';
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Espace Connexion</h2>
    
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>Nom d'utilisateur</label>
        <input v-model="username" type="text" required placeholder="Ex: admin" />
      </div>
      
      <div class="form-group">
        <label>Mot de passe</label>
        <input v-model="password" type="password" required placeholder="Ex: 123" />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit" class="submit-btn">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
}
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
input {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
}
input:focus {
  outline: none;
  border-color: #42b883;
}
.submit-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  font-size: 1rem;
  transition: background 0.3s;
}
.submit-btn:hover {
  background: #33a06f;
}
.error {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
}
</style>