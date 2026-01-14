// Gestion de la création de compte
document.getElementById('createAccountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const userType = document.getElementById('user_type').value;
    
    // Validation
    if (!nom || !prenom || !email || !login || !password || !userType) {
        showMessage('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Vérifier la confirmation du mot de passe
    if (password !== confirmPassword) {
        showMessage('Les mots de passe ne correspondent pas', 'error');
        return;
    }
    
    // Vérifier la longueur du mot de passe
    if (password.length < 6) {
        showMessage('Le mot de passe doit contenir au moins 6 caractères', 'error');
        return;
    }
    
    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Vérifier si le login existe déjà
    if (users.find(u => u.login === login)) {
        showMessage('Ce login est déjà utilisé', 'error');
        return;
    }
    
    // Vérifier si l'email existe déjà
    if (users.find(u => u.email === email)) {
        showMessage('Cet email est déjà utilisé', 'error');
        return;
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
        id: Date.now(),
        nom: nom,
        prenom: prenom,
        email: email,
        phone: phone,
        login: login,
        password: password,
        userType: userType,
        dateInscription: new Date().toLocaleDateString('fr-FR'),
        stats: {
            messages: 0,
            friends: 0,
            activeDays: 0
        }
    };
    
    // Ajouter l'utilisateur à la liste
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Afficher un message de succès
    showMessage('Compte créé avec succès ! Redirection vers la connexion...', 'success');
    
    // Redirection vers la page de connexion
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
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
    const form = document.getElementById('createAccountForm');
    form.parentNode.insertBefore(alert, form);
    
    // Faire défiler vers le haut pour voir le message
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Supprimer le message après 5 secondes si c'est une erreur
    if (type === 'error') {
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Validation en temps réel du mot de passe
document.getElementById('confirm_password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = '#d9534f';
    } else {
        this.style.borderColor = '#ddd';
    }
});
