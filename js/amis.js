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

// Gérer les actions sur les amis
function setupFriendActions() {
    // Boutons Message
    document.querySelectorAll('.btn-small:not(.btn-danger)').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendCard = this.closest('.friend-card');
            const friendName = friendCard.querySelector('h3').textContent;
            alert(`Envoyer un message à ${friendName} - Fonctionnalité en cours de développement !`);
        });
    });
    
    // Boutons Retirer
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendCard = this.closest('.friend-card');
            const friendName = friendCard.querySelector('h3').textContent;
            
            if (confirm(`Voulez-vous vraiment retirer ${friendName} de vos amis ?`)) {
                friendCard.style.opacity = '0';
                friendCard.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    friendCard.remove();
                    checkEmptyState();
                }, 300);
            }
        });
    });
}

// Vérifier si la liste est vide
function checkEmptyState() {
    const friendsGrid = document.querySelector('.friends-grid');
    const emptyState = document.querySelector('.empty-state');
    
    if (friendsGrid && friendsGrid.children.length === 0) {
        friendsGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
    }
}

// Initialisation
window.addEventListener('load', function() {
    loadUserInfo();
    setupFriendActions();
});
