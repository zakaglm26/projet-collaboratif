# 🚀 Site Web Fonctionnel - Guide d'Utilisation

## ✅ Fonctionnalités Implémentées

### 1. **Système d'Authentification Complet**
- ✅ Création de compte avec validation
- ✅ Connexion sécurisée
- ✅ Déconnexion
- ✅ Vérification de session

### 2. **Gestion de Profil**
- ✅ Affichage des informations personnelles
- ✅ Statistiques utilisateur
- ✅ Design responsive

### 3. **Interface Moderne**
- ✅ Design avec dégradés colorés
- ✅ Navigation intuitive
- ✅ Cartes et animations
- ✅ Responsive (mobile, tablette, desktop)

## 📁 Structure des Fichiers

```
projet/
├── index.html              # Page de connexion (page d'accueil)
├── login.html              # Page de connexion
├── create_account.html     # Création de compte
├── accueil.html           # Page d'accueil après connexion
├── profil.html            # Page de profil utilisateur
├── css/
│   └── style.css          # Styles CSS
└── js/
    ├── login.js           # Script de connexion
    ├── create_account.js  # Script création de compte
    ├── accueil.js         # Script page d'accueil
    └── profil.js          # Script profil
```

## 🎯 Comment Utiliser le Site

### **Étape 1 : Ouvrir le site**
- Ouvrez `index.html` dans votre navigateur

### **Étape 2 : Créer un compte**
1. Cliquez sur "Créer un compte"
2. Remplissez le formulaire :
   - Nom et Prénom
   - Email
   - Login (nom d'utilisateur unique)
   - Mot de passe (minimum 6 caractères)
   - Type d'utilisateur (Étudiant ou Employé)
3. Cliquez sur "Créer mon compte"

### **Étape 3 : Se connecter**
1. Utilisez le login et mot de passe créés
2. Cliquez sur "Se connecter"

### **Étape 4 : Explorer**
- Accueil : Fil d'actualités
- Mon Profil : Voir vos informations
- Navigation fluide entre les pages

## 🔧 Fonctionnalités Techniques

### **Stockage Local**
- Les données sont stockées dans `localStorage`
- Pas besoin de base de données
- Les comptes persistent même après fermeture du navigateur

### **Validation**
- ✅ Vérification des champs obligatoires
- ✅ Validation email
- ✅ Confirmation mot de passe
- ✅ Login unique
- ✅ Messages d'erreur clairs

### **Sécurité**
- Protection des pages (redirection si non connecté)
- Gestion de session
- Confirmation de déconnexion

## 🎨 Personnalisation

### **Couleurs**
Vous pouvez modifier les couleurs dans `css/style.css` :
```css
:root {
    --primary-color: #4a90e2;    /* Couleur principale */
    --secondary-color: #357abd;  /* Couleur secondaire */
    --success-color: #5cb85c;    /* Succès */
    --danger-color: #d9534f;     /* Danger */
}
```

## 📱 Responsive Design

Le site s'adapte automatiquement à :
- 📱 Smartphones (< 768px)
- 📱 Tablettes (768px - 1024px)
- 💻 Desktop (> 1024px)

## 🐛 Dépannage

### **"Les styles ne s'affichent pas"**
- Vérifiez que le dossier `css/` contient `style.css`
- Vérifiez les chemins dans les fichiers HTML

### **"Impossible de se connecter"**
- Créez d'abord un compte
- Vérifiez que vous utilisez le bon login/mot de passe
- Ouvrez la console navigateur (F12) pour voir les erreurs

### **"Les données disparaissent"**
- Ne videz pas le cache/localStorage de votre navigateur
- Utilisez le même navigateur

## 🚀 Prochaines Étapes

Pour améliorer le site, vous pouvez ajouter :
- 📝 Système de messagerie réel
- 👥 Gestion des amis
- 📷 Upload de photos de profil
- 🔄 Modification du profil
- 💬 Commentaires et likes

## 💡 Conseil

Pour tester rapidement, créez un compte test :
- Login: `test`
- Mot de passe: `test123`
- Type: Étudiant

---

**Créé avec ❤️ - Site 100% fonctionnel et prêt à l'emploi !**
