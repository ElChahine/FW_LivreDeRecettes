import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router/index.js';

// Instanciation de l'application Vue
const app = createApp(App);

// Création de l'instance Pinia pour gérer les variables globales (stores)
const pinia = createPinia();

// Injection des outils dans l'application
app.use(pinia);
app.use(router);

// Lancement de l'application en l'attachant à la balise #app du fichier index.html
app.mount('#app');