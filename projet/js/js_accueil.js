// accueil.js - Gestion de la page d'accueil

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

// Charger les informations de l'utilisateur
function loadUserInfo() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('username').textContent = user.login || 'Utilisateur';
    document.getElementById('user-fullname').textContent = `${user.prenom} ${user.nom}`;
    document.getElementById('user-status').textContent = user.user_type === 'student' ? 'Étudiant' : 'Employé';
}

// Charger les messages
async function loadMessages() {
    try {
        const token = sessionStorage.getItem('token');
        
        const response = await fetch('api/messages.php', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success && data.messages) {
            displayMessages(data.messages);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des messages:', error);
    }
}

// Afficher les messages
function displayMessages(messages) {
    const messagesList = document.getElementById('messagesList');
    
    if (messages.length === 0) {
        messagesList.innerHTML = '<p>Aucun message pour le moment</p>';
        return;
    }
    
    messagesList.innerHTML = messages.map(message => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-author">${message.author_name}</span>
                <span class="message-date">${formatDate(message.publication_date)}</span>
            </div>
            <div class="message-content">
                <p>${message.content}</p>
            </div>
        </div>
    `).join('');
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('fr-FR');
}

// Initialisation au chargement de la page
window.addEventListener('load', function() {
    loadUserInfo();
    loadMessages();
    
    // Rafraîchir les messages toutes les 30 secondes
    setInterval(loadMessages, 30000);
});