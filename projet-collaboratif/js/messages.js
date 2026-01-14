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

// Charger les informations de l'utilisateur
function loadUserInfo() {
    const user = checkAuth();
    if (!user) return;
    
    document.getElementById('username').textContent = user.login;
}

// Gérer les actions sur les messages
function setupMessageActions() {
    // Boutons Répondre
    document.querySelectorAll('.btn-reply').forEach(btn => {
        btn.addEventListener('click', function() {
            const messageCard = this.closest('.message-card');
            const author = messageCard.querySelector('.message-author').textContent;
            alert(`Fonctionnalité "Répondre à ${author}" en cours de développement !`);
        });
    });
    
    // Boutons Supprimer
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
                const messageCard = this.closest('.message-card');
                messageCard.style.opacity = '0';
                messageCard.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    messageCard.remove();
                    checkEmptyState();
                }, 300);
            }
        });
    });
}

// Vérifier si la liste est vide
function checkEmptyState() {
    const messagesSection = document.querySelector('.messages-section');
    const emptyState = document.querySelector('.empty-state');
    
    if (messagesSection && messagesSection.children.length === 0) {
        messagesSection.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
    }
}

// Initialisation
window.addEventListener('load', function() {
    loadUserInfo();
    setupMessageActions();
});
