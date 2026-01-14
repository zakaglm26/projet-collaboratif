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

// Gérer la recherche
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value.trim();
    
    if (!searchValue) {
        alert('Veuillez entrer un nom, prénom ou login pour rechercher');
        return;
    }
    
    // Simuler une recherche
    alert(`Recherche de "${searchValue}" - Fonctionnalité en cours de développement !`);
});

// Gérer l'ajout d'amis
function setupAddFriendActions() {
    document.querySelectorAll('.btn-small').forEach(btn => {
        btn.addEventListener('click', function() {
            const friendCard = this.closest('.friend-card');
            const friendName = friendCard.querySelector('h3').textContent;
            
            // Animation du bouton
            this.textContent = '✓ Ajouté !';
            this.style.background = '#28a745';
            this.disabled = true;
            
            // Message de succès
            setTimeout(() => {
                alert(`${friendName} a été ajouté à vos amis !`);
                
                // Animation de disparition
                friendCard.style.opacity = '0';
                friendCard.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    friendCard.remove();
                }, 300);
            }, 500);
        });
    });
}

// Gérer la touche Entrée dans la recherche
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// Initialisation
window.addEventListener('load', function() {
    loadUserInfo();
    setupAddFriendActions();
});
