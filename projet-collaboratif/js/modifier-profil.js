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
    
    // Pré-remplir le formulaire avec les données actuelles
    document.getElementById('nom').value = user.nom;
    document.getElementById('prenom').value = user.prenom;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('user_type').value = user.userType;
}

// Gérer la soumission du formulaire
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = checkAuth();
    if (!user) return;
    
    // Récupérer les nouvelles valeurs
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const userType = document.getElementById('user_type').value;
    
    // Validation
    if (!nom || !prenom || !email || !userType) {
        showMessage('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Récupérer tous les utilisateurs
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    const emailExists = users.find(u => u.email === email && u.id !== user.id);
    if (emailExists) {
        showMessage('Cet email est déjà utilisé par un autre utilisateur', 'error');
        return;
    }
    
    // Mettre à jour l'utilisateur
    user.nom = nom;
    user.prenom = prenom;
    user.email = email;
    user.phone = phone;
    user.userType = userType;
    
    // Mettre à jour dans la liste des utilisateurs
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Mettre à jour l'utilisateur courant
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Afficher un message de succès
    showMessage('Profil mis à jour avec succès !', 'success');
    
    // Redirection vers le profil
    setTimeout(() => {
        window.location.href = 'profil.html';
    }, 1500);
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
    const form = document.getElementById('editProfileForm');
    form.parentNode.insertBefore(alert, form);
    
    // Faire défiler vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Supprimer le message après 5 secondes si c'est une erreur
    if (type === 'error') {
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Initialisation
window.addEventListener('load', function() {
    loadUserInfo();
});
