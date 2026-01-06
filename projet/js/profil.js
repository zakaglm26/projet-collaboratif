// profil.js - Gestion de la page de profil

// Vérifier l'authentification
function checkAuth() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return JSON.parse(user);
}

// Déconnexion
function logout() {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// Charger les informations du profil
async function loadProfile() {
    const user = checkAuth();
    if (!user) return;
    
    // Informations de base depuis la session
    document.getElementById('username').textContent = user.login || 'Utilisateur';
    document.getElementById('profile-name').textContent = `${user.prenom} ${user.nom}`;
    document.getElementById('profile-type').textContent = user.user_type === 'student' ? 'Étudiant' : 'Employé';
    document.getElementById('profile-email').textContent = user.email || 'Non renseigné';
    document.getElementById('profile-phone').textContent = user.phone || 'Non renseigné';
    document.getElementById('profile-login').textContent = user.login || 'Non renseigné';
    
    // Charger les statistiques depuis l'API
    await loadStats();
}

// Charger les statistiques
async function loadStats() {
    try {
        const token = sessionStorage.getItem('token');
        
        const response = await fetch('api/profile-stats.php', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('stat-messages').textContent = data.stats.messages || 0;
            document.getElementById('stat-friends').textContent = data.stats.friends || 0;
            document.getElementById('stat-active').textContent = data.stats.active_days || 0;
            
            if (data.profile.created_at) {
                const date = new Date(data.profile.created_at);
                document.getElementById('profile-date').textContent = date.toLocaleDateString('fr-FR');
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
    }
}

// Initialisation au chargement de la page
window.addEventListener('load', function() {
    loadProfile();
});