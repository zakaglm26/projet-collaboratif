// login.js - Gestion de la connexion

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    
    // Validation basique
    if (!login || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    try {
        // Appel API pour la connexion
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Stocker les informations de session
            sessionStorage.setItem('user', JSON.stringify(data.user));
            sessionStorage.setItem('token', data.token);
            
            // Redirection vers la page d'accueil
            window.location.href = 'accueil.html';
        } else {
            alert(data.message || 'Identifiants incorrects');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la connexion');
    }
});

// Vérifier si l'utilisateur est déjà connecté
window.addEventListener('load', function() {
    const user = sessionStorage.getItem('user');
    if (user) {
        window.location.href = 'accueil.html';
    }
});