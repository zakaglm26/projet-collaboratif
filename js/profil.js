// Vérifier si l'utilisateur est connecté
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return null;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return null;
    }
    
    return currentUser;
}

// Fonction de déconnexion
function logout() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Charger les informations du profil
function loadProfile() {
    const user = checkAuth();
    if (!user) return;
    
    // Afficher le nom d'utilisateur dans la navbar
    document.getElementById('username').textContent = user.login;
    
    // Afficher le nom complet
    const fullName = `${user.prenom} ${user.nom}`;
    document.getElementById('profile-name').textContent = fullName;
    
    // Afficher le type d'utilisateur
    const userTypeText = user.userType === 'student' ? 'Étudiant' : 'Employé';
    document.getElementById('profile-type').textContent = userTypeText;
    
    // Afficher l'email
    document.getElementById('profile-email').textContent = user.email;
    
    // Afficher le téléphone
    document.getElementById('profile-phone').textContent = user.phone || 'Non renseigné';
    
    // Afficher le login
    document.getElementById('profile-login').textContent = user.login;
    
    // Afficher la date d'inscription
    document.getElementById('profile-date').textContent = user.dateInscription;
    
    // Afficher les statistiques
    if (user.stats) {
        document.getElementById('stat-messages').textContent = user.stats.messages || 0;
        document.getElementById('stat-friends').textContent = user.stats.friends || 0;
        document.getElementById('stat-active').textContent = user.stats.activeDays || 0;
    } else {
        // Initialiser les stats si elles n'existent pas
        document.getElementById('stat-messages').textContent = '0';
        document.getElementById('stat-friends').textContent = '0';
        document.getElementById('stat-active').textContent = '0';
    }
}

// Initialisation au chargement de la page
window.addEventListener('load', function() {
    loadProfile();
});
