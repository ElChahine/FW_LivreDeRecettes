import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // L'utilisateur actuellement connecté (null = personne n'est connecté)
    user: null, 
    
    
    fakeUsersDB: [
      { username: 'admin', password: '123', name: 'Chahine' },
      { username: 'admin+', password: '123', name: 'Noé' },
      {username: 'utilisateur', password: '123', name:'user'}
    ]
  }),
  actions: {
    // Fonction pour vérifier les identifiants
    login(username, password) {
      const foundUser = this.fakeUsersDB.find(
        (u) => u.username === username && u.password === password
      );
      
      if (foundUser) {
        this.user = { name: foundUser.name }; // Connexion réussie
        return true;
      }
      return false; // Identifiants incorrects
    },
    
    // Fonction pour se déconnecter
    logout() {
      this.user = null;
    }
  }
});