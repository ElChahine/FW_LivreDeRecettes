import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Tente de récupérer la session dans le navigateur, sinon l'utilisateur est null (déconnecté)
    user: JSON.parse(localStorage.getItem('currentUser')) || null, 
    
    // Notre base de données factice codée en dur
    fakeUsersDB: [
      { username: 'admin', password: '123', name: 'Chahine' },
      { username: 'admin+', password: '123', name: 'Noé' },
      { username: 'utilisateur', password: '123', name:'user' }
    ]
  }),
  actions: {
    // Vérifie si les identifiants correspondent à un compte de la fakeUsersDB
    login(username, password) {
      const foundUser = this.fakeUsersDB.find(
        (u) => u.username === username && u.password === password
      );
      
      if (foundUser) {
        // Enregistre les infos du compte dans la variable d'état
        this.user = { username: foundUser.username, name: foundUser.name }; 
        // Sauvegarde la session dans le cache du navigateur pour éviter la déconnexion au rafraîchissement
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        return true; // Succès
      }
      return false; // Échec
    },
    
    // Déconnecte l'utilisateur et nettoie le cache du navigateur
    logout() {
      this.user = null;
      localStorage.removeItem('currentUser');
    }
  }
});