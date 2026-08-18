# 🎮 SQL QUEST ARENA &bull; Par OROMASIS BANDUENGA

Plateforme gamifiée d'apprentissage et de maîtrise du langage SQL avec bac à sable interactif, défis RPG, mini-jeux (construction de requêtes, mots mêlés, textes à trous) et boss de bases de données.

---

## 📥 Comment Télécharger & Installer l'Application

### 1️⃣ Option 1 : Télécharger l'Exécutable (.exe pour Windows / .app pour Mac)
Une fois ce projet sur votre compte GitHub, le workflow automatisé **GitHub Actions** (`.github/workflows/build-desktop.yml`) compile automatiquement les exécutables :
- **Windows** : `SQL Quest Arena Setup.exe` (Installateur) et version portable `.exe`
- **macOS** : `SQL Quest Arena.dmg` et `.zip` (.app)
- **Linux** : `SQL Quest Arena.AppImage` et `.deb`

👉 Pour les télécharger :
1. Allez sur votre repository GitHub dans l'onglet **"Actions"** ou **"Releases"**.
2. Téléchargez l'archive correspondant à votre système d'exploitation.

---

### 2️⃣ Option 2 : Installer Directement comme PWA (PC & Téléphone)
L'application est une **PWA (Progressive Web App)** complète avec support **Hors-ligne** :
- **Sur Ordinateur (Windows / Mac / Linux)** : Ouvrez l'application dans Chrome, Edge ou Brave et cliquez sur le bouton **"Installer l'Application"** ou l'icône **⊕** dans la barre d'adresse. Une icône Windows s'ajoutera à votre bureau.
- **Sur Téléphone Android** : Menu Chrome (⋮) > **"Ajouter à l'écran d'accueil"** ou **"Installer l'application"**.
- **Sur iPhone / iPad** : Bouton Partager (⎋) > **"Sur l'écran d'accueil ⊞"**.

---

### 3️⃣ Option 3 : Compiler les fichiers .exe / .app localement sur votre PC

```bash
# 1. Cloner votre dépôt
git clone https://github.com/votre-nom/sql-quest-arena.git
cd sql-quest-arena

# 2. Installer les dépendances
npm install

# 3. Lancer en mode développement
npm run dev

# 4. Générer le fichier .exe (Windows) ou .app (Mac)
npm run electron:build
```
Les fichiers générés se trouveront directement dans le dossier `/release`.

---

## 👤 Concepteur & Contact
- **Auteur & Architecte** : **OROMASIS BANDUENGA**
- **WhatsApp** : `+243 89 60 82 244`
