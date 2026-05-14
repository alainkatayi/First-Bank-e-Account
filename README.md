# 🏦 Bank Self-Boarding Frontend (Angular)

Ce projet est l'interface utilisateur (SPA) de l'application de self-boarding bancaire. Il permet aux prospects de soumettre leur dossier et aux agents/administrateurs de traiter les demandes via un tableau de bord premium.

## 🎨 Design & UX
*   **Framework CSS :** Tailwind CSS
*   **Style :** Industriel, moderne, typographie "Extra-Bold" et contrastes élevés.
*   **Navigation Adaptive :** 
    *   **Agent :** Navigation horizontale (Navbar) pour maximiser l'espace de lecture des documents.
    *   **Admin :** Sidebar latérale fixe et immobile pour une gestion rapide des flux.
*   **Animations :** Transitions fluides via Tailwind `animate-in`.

---

## 🚀 Installation & Lancement

### 1. Prérequis
*   Node.js (v18+)
*   Angular CLI (`npm install -g @angular/cli`)

### 2. Cloner et Installer

* git clone <url-du-repo>
* cd bank-boarding-frontend
* npm install

## Configuration du fichier d'environnement
* Dans le dossier Src, creer le dossier environnement
* Puis dans le dossier environnement, creer le fichier: env.ts
* Dans le fichier env.ts, ajoute la variable:
  
**export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api/',
    url: 'http://localhost:8000/',
    url_img: 'http://localhost:8000',
}; **

