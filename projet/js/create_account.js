// create-account.js - Gestion de la création de compte

document.getElementById('createAccountForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Récupération des valeurs
    const formData = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        login: document.getElementById('login').value,
        password: document.getElementById('password').value,
        confirm_password: document.getElementById('confirm_password').value,
        user_type: document.getElementById('user_type').value
    };
    
    // Validation
    if (!validateForm(formData)) {
        return;
    }
    
    // Vérification des mots de passe
    if (formData.password !== formData.confirm_password) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    
    try {
        // Appel API pour créer le compte
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Erreur lors de la création du compte');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la création du compte');
    }
});

function validateForm(data) {
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Veuillez entrer une adresse email valide');
        return false;
    }
    
    // Validation du mot de passe (minimum 6 caractères)
    if (data.password.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return false;
    }
    
    // Vérifier que tous les champs requis sont remplis
    if (!data.nom || !data.prenom || !data.email || !data.login || !data.password || !data.user_type) {
        alert('Veuillez remplir tous les champs obligatoires');
        return false;
    }
    
    return true;
}

// Validation en temps réel du mot de passe
document.getElementById('confirm_password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.setCustomValidity('Les mots de passe ne correspondent pas');
    } else {
        this.setCustomValidity('');
    }
});