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
    
    // Afficher le nom d'utilisateur dans la navbar
    document.getElementById('username').textContent = user.login;
    
    // Afficher les informations dans la sidebar
    const fullName = `${user.prenom} ${user.nom}`;
    document.getElementById('user-fullname').textContent = fullName;
    
    const userTypeText = user.userType === 'student' ? 'Étudiant' : 'Employé';
    document.getElementById('user-status').textContent = userTypeText;
}

// Charger les messages
function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    
    // Messages de démonstration
    const demoMessages = [
        {
            author: 'Jean Dupont',
            date: 'Il y a 2 heures',
            content: 'Bienvenue sur notre nouvelle plateforme ! N\'hésitez pas à partager vos idées.'
        },
        {
            author: 'Marie Martin',
            date: 'Il y a 5 heures',
            content: 'Super projet ! J\'ai hâte de voir comment ça va évoluer.'
        },
        {
            author: 'Paul Durant',
            date: 'Hier',
            content: 'Quelqu\'un veut collaborer sur un nouveau projet de développement web ?'
        }
    ];
    
    // Effacer les messages existants
    messagesList.innerHTML = '';
    
    // Ajouter les messages
    demoMessages.forEach(message => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <span class="message-author">${message.author}</span>
                <span class="message-date">${message.date}</span>
            </div>
            <div class="message-content">
                <p>${message.content}</p>
            </div>
        `;
        messagesList.appendChild(messageCard);
    });
}

// Initialisation au chargement de la page
window.addEventListener('load', function() {
    loadUserInfo();
    loadMessages();
});
