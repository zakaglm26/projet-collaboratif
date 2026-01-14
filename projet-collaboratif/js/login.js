// Gestion de la connexion
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;
    
    // Récupérer les utilisateurs enregistrés
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Vérifier les identifiants
    const user = users.find(u => u.login === login && u.password === password);
    
    if (user) {
        // Connexion réussie
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Afficher un message de succès
        showMessage('Connexion réussie ! Redirection...', 'success');
        
        // Redirection vers la page d'accueil
        setTimeout(() => {
            window.location.href = 'accueil.html';
        }, 1000);
    } else {
        // Identifiants incorrects
        showMessage('Login ou mot de passe incorrect', 'error');
    }
});

// Fonction pour afficher les messages
function showMessage(message, type) {
    // Supprimer les anciens messages
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) {
        oldAlert.remove();
    }
    
    // Créer le nouveau message
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insérer le message avant le formulaire
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(alert, form);
    
    // Supprimer le message après 5 secondes
    if (type === 'error') {
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Vérifier si l'utilisateur est déjà connecté
window.addEventListener('load', function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'accueil.html';
    }
});
