import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // On vérifie si une session est déjà enregistrée dans le navigateur, sinon null
    user: JSON.parse(localStorage.getItem('currentUser')) || null, 
    
    fakeUsersDB: [
      { username: 'admin', password: '123', name: 'Chahine' },
      { username: 'admin+', password: '123', name: 'Noé' },
      { username: 'utilisateur', password: '123', name:'user' }
    ]
  }),
  actions: {
    login(username, password) {
      const foundUser = this.fakeUsersDB.find(
        (u) => u.username === username && u.password === password
      );
      
      if (foundUser) {
        // On enregistre le username (clé unique) en plus du name
        this.user = { username: foundUser.username, name: foundUser.name }; 
        // On sauvegarde l'utilisateur connecté dans le navigateur
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        return true;
      }
      return false; 
    },
    
    logout() {
      this.user = null;
      // On vide le navigateur à la déconnexion
      localStorage.removeItem('currentUser');
    }
  }
});