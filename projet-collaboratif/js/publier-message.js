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
    
    // Mettre à jour l'aperçu avec le nom de l'utilisateur
    const fullName = `${user.prenom} ${user.nom}`;
    document.getElementById('previewAuthor').textContent = fullName;
}

// Compter les caractères
const messageContent = document.getElementById('messageContent');
const charCount = document.getElementById('charCount');
const previewContent = document.getElementById('previewContent');

messageContent.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = length;
    
    // Limiter à 500 caractères
    if (length > 500) {
        this.value = this.value.substring(0, 500);
        charCount.textContent = 500;
    }
    
    // Mettre à jour l'aperçu
    if (this.value.trim()) {
        previewContent.textContent = this.value;
    } else {
        previewContent.textContent = 'Votre message apparaîtra ici...';
    }
    
    // Changer la couleur si proche de la limite
    if (length > 450) {
        charCount.style.color = '#d9534f';
    } else if (length > 400) {
        charCount.style.color = '#f0ad4e';
    } else {
        charCount.style.color = '#666';
    }
});

// Gérer la soumission du formulaire
document.getElementById('publishMessageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = checkAuth();
    if (!user) return;
    
    const content = messageContent.value.trim();
    const sharePublic = document.getElementById('sharePublic').checked;
    
    if (!content) {
        alert('Veuillez écrire un message avant de publier');
        return;
    }
    
    if (content.length < 10) {
        alert('Votre message doit contenir au moins 10 caractères');
        return;
    }
    
    // Créer le message
    const newMessage = {
        id: Date.now(),
        userId: user.id,
        author: `${user.prenom} ${user.nom}`,
        content: content,
        date: new Date().toISOString(),
        public: sharePublic
    };
    
    // Sauvegarder le message (simulation)
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.unshift(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    // Mettre à jour les stats de l'utilisateur
    if (!user.stats) {
        user.stats = { messages: 0, friends: 0, activeDays: 0 };
    }
    user.stats.messages += 1;
    
    // Mettre à jour dans localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Message de succès
    alert('Message publié avec succès ! 🎉');
    
    // Redirection vers l'accueil
    window.location.href = 'accueil.html';
});

// Initialisation
window.addEventListener('load', function() {
    loadUserInfo();
});
