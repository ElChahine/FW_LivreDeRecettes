import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Tente de récupérer la session dans le navigateur
    user: JSON.parse(localStorage.getItem('currentUser')) || null, 
    
    // Notre base de données
    fakeUsersDB: [
      { username: 'admin', password: '123', name: 'Chahine' },
      { username: 'admin+', password: '123', name: 'Noé' },
      { username: 'utilisateur', password: '123', name:'user' }
    ]
  }),
  actions: {
    // Vérifie si les identifiants correspondent à un compte de la bdd
    login(username, password) {
      const foundUser = this.fakeUsersDB.find(
        (u) => u.username === username && u.password === password
      );
      
      if (foundUser) {
        // Enregistre les infos du compte
        this.user = { username: foundUser.username, name: foundUser.name }; 
        // Sauvegarde la session dans le cache du navigateur
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        return true;
      }
      return false;
    },
    
    // Déconnecte l'utilisateur et nettoie le cache du navigateur
    logout() {
      this.user = null;
      localStorage.removeItem('currentUser');
    }
  }
});