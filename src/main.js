import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Importation du routeur

const app = createApp(App);
app.use(router); // Ajout du routeur
app.mount('#app');