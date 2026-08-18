import { DatabaseDef } from '../types';

export const DATABASES: Record<string, DatabaseDef> = {
  university: {
    id: 'university',
    name: 'Université Royale du Code',
    description: 'Gestion des étudiants, cours académiques, notes et corps professoral.',
    icon: 'GraduationCap',
    tables: {
      etudiants: {
        name: 'etudiants',
        description: 'Liste des étudiants inscrits',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'prenom', type: 'TEXT' },
          { name: 'age', type: 'INTEGER' },
          { name: 'classe', type: 'TEXT' },
          { name: 'filiere', type: 'TEXT' },
          { name: 'moyenne', type: 'REAL' },
          { name: 'ville', type: 'TEXT' }
        ],
        data: [
          { id: 1, nom: 'Dupont', prenom: 'Marie', age: 20, classe: 'L3-A', filiere: 'Informatique', moyenne: 16.5, ville: 'Paris' },
          { id: 2, nom: 'Martin', prenom: 'Jean', age: 22, classe: 'M1-B', filiere: 'Mathématiques', moyenne: 12.0, ville: 'Lyon' },
          { id: 3, nom: 'Dubois', prenom: 'Sophie', age: 19, classe: 'L2-A', filiere: 'Informatique', moyenne: 18.2, ville: 'Bordeaux' },
          { id: 4, nom: 'Moreau', prenom: 'Lucas', age: 21, classe: 'L3-B', filiere: 'Physique', moyenne: 14.0, ville: 'Paris' },
          { id: 5, nom: 'Lefebvre', prenom: 'Emma', age: 20, classe: 'L3-A', filiere: 'Informatique', moyenne: 17.0, ville: 'Lille' },
          { id: 6, nom: 'Garcia', prenom: 'Alexandre', age: 23, classe: 'M2-A', filiere: 'Data Science', moyenne: 15.8, ville: 'Toulouse' },
          { id: 7, nom: 'Roux', prenom: 'Camille', age: 19, classe: 'L2-B', filiere: 'Mathématiques', moyenne: 9.8, ville: 'Nantes' },
          { id: 8, nom: 'Bernard', prenom: 'Thomas', age: 24, classe: 'M2-B', filiere: 'Informatique', moyenne: 13.5, ville: 'Paris' },
          { id: 9, nom: 'Petit', prenom: 'Léa', age: 21, classe: 'L3-A', filiere: 'Data Science', moyenne: 19.1, ville: 'Strasbourg' },
          { id: 10, nom: 'Bertrand', prenom: 'Hugo', age: 20, classe: 'L3-B', filiere: 'Physique', moyenne: 11.2, ville: 'Marseille' }
        ]
      },
      professeurs: {
        name: 'professeurs',
        description: 'Enseignants et départements',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'prenom', type: 'TEXT' },
          { name: 'departement', type: 'TEXT' },
          { name: 'salaire', type: 'INTEGER' },
          { name: 'date_embauche', type: 'TEXT' }
        ],
        data: [
          { id: 101, nom: 'Turing', prenom: 'Alan', departement: 'Informatique', salaire: 4500, date_embauche: '2015-09-01' },
          { id: 102, nom: 'Lovelace', prenom: 'Ada', departement: 'Informatique', salaire: 4800, date_embauche: '2014-02-15' },
          { id: 103, nom: 'Euler', prenom: 'Leonhard', departement: 'Mathématiques', salaire: 4200, date_embauche: '2018-09-01' },
          { id: 104, nom: 'Curie', prenom: 'Marie', departement: 'Physique', salaire: 5100, date_embauche: '2012-05-10' },
          { id: 105, nom: 'Codd', prenom: 'Edgar', departement: 'Data Science', salaire: 4900, date_embauche: '2016-11-01' }
        ]
      },
      cours: {
        name: 'cours',
        description: 'Catalogue des matières et crédits ECTS',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'intitule', type: 'TEXT' },
          { name: 'professeur_id', type: 'INTEGER', foreignKey: { table: 'professeurs', column: 'id' } },
          { name: 'credits', type: 'INTEGER' },
          { name: 'semestre', type: 'INTEGER' }
        ],
        data: [
          { id: 201, intitule: 'Bases de Données Relationnelles & SQL', professeur_id: 105, credits: 6, semestre: 1 },
          { id: 202, intitule: 'Algorithmique Avancée', professeur_id: 101, credits: 6, semestre: 1 },
          { id: 203, intitule: 'Programmation Fonctionnelle', professeur_id: 102, credits: 5, semestre: 2 },
          { id: 204, intitule: 'Probabilités et Statistiques', professeur_id: 103, credits: 4, semestre: 1 },
          { id: 205, intitule: 'Mécanique Quantique', professeur_id: 104, credits: 6, semestre: 2 },
          { id: 206, intitule: 'Big Data & Machine Learning', professeur_id: 105, credits: 5, semestre: 2 }
        ]
      },
      notes: {
        name: 'notes',
        description: 'Résultats aux examens',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'etudiant_id', type: 'INTEGER', foreignKey: { table: 'etudiants', column: 'id' } },
          { name: 'cours_id', type: 'INTEGER', foreignKey: { table: 'cours', column: 'id' } },
          { name: 'note', type: 'REAL' },
          { name: 'session', type: 'TEXT' }
        ],
        data: [
          { id: 1, etudiant_id: 1, cours_id: 201, note: 18.0, session: 'Normale' },
          { id: 2, etudiant_id: 1, cours_id: 202, note: 15.5, session: 'Normale' },
          { id: 3, etudiant_id: 2, cours_id: 204, note: 11.0, session: 'Normale' },
          { id: 4, etudiant_id: 3, cours_id: 201, note: 19.5, session: 'Normale' },
          { id: 5, etudiant_id: 3, cours_id: 203, note: 17.0, session: 'Normale' },
          { id: 6, etudiant_id: 4, cours_id: 205, note: 14.0, session: 'Normale' },
          { id: 7, etudiant_id: 5, cours_id: 201, note: 17.5, session: 'Normale' },
          { id: 8, etudiant_id: 5, cours_id: 206, note: 16.0, session: 'Normale' },
          { id: 9, etudiant_id: 6, cours_id: 206, note: 18.5, session: 'Normale' },
          { id: 10, etudiant_id: 7, cours_id: 204, note: 8.5, session: 'Normale' },
          { id: 11, etudiant_id: 7, cours_id: 204, note: 12.0, session: 'Rattrapage' },
          { id: 12, etudiant_id: 8, cours_id: 201, note: 13.0, session: 'Normale' },
          { id: 13, etudiant_id: 9, cours_id: 201, note: 20.0, session: 'Normale' },
          { id: 14, etudiant_id: 9, cours_id: 206, note: 19.0, session: 'Normale' },
          { id: 15, etudiant_id: 10, cours_id: 205, note: 10.5, session: 'Normale' }
        ]
      }
    }
  },

  shop: {
    id: 'shop',
    name: 'CyberBoutique E-Commerce',
    description: 'Catalogue de vente en ligne, clients, paniers et facturation.',
    icon: 'ShoppingCart',
    tables: {
      categories: {
        name: 'categories',
        description: 'Rayons de produits',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'code_rayon', type: 'TEXT' }
        ],
        data: [
          { id: 1, nom: 'Ordinateurs & Portables', code_rayon: 'HW-PC' },
          { id: 2, nom: 'Périphériques & Claviers', code_rayon: 'HW-ACC' },
          { id: 3, nom: 'Composants & GPU', code_rayon: 'HW-COMP' },
          { id: 4, nom: 'Logiciels & Jeux', code_rayon: 'SW-GAM' }
        ]
      },
      produits: {
        name: 'produits',
        description: 'Inventaire et tarifs',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'categorie_id', type: 'INTEGER', foreignKey: { table: 'categories', column: 'id' } },
          { name: 'prix', type: 'REAL' },
          { name: 'stock', type: 'INTEGER' },
          { name: 'marque', type: 'TEXT' }
        ],
        data: [
          { id: 1, nom: 'Clavier Mécanique RGB Quantum', categorie_id: 2, prix: 129.99, stock: 45, marque: 'CyberGear' },
          { id: 2, nom: 'Souris Gamer Ergonomique 16000DPI', categorie_id: 2, prix: 69.90, stock: 80, marque: 'CyberGear' },
          { id: 3, nom: 'Écran UltraWide 34 Pouces OLED', categorie_id: 2, prix: 649.00, stock: 12, marque: 'VisionX' },
          { id: 4, nom: 'Laptop Dev Titanium Pro i9', categorie_id: 1, prix: 1899.99, stock: 8, marque: 'ApexTech' },
          { id: 5, nom: 'Carte Graphique RTX Nebula 4080', categorie_id: 3, prix: 1199.00, stock: 5, marque: 'NV-Vision' },
          { id: 6, nom: 'Casque Audio Spatial Sans Fil', categorie_id: 2, prix: 179.50, stock: 30, marque: 'AuraSound' },
          { id: 7, nom: 'Processeur Core Quantum 16-Core', categorie_id: 3, prix: 420.00, stock: 22, marque: 'ApexTech' },
          { id: 8, nom: 'Mini PC Linux Nomade', categorie_id: 1, prix: 380.00, stock: 15, marque: 'TuxBox' }
        ]
      },
      clients: {
        name: 'clients',
        description: 'Comptes clients enregistrés',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'prenom', type: 'TEXT' },
          { name: 'email', type: 'TEXT' },
          { name: 'ville', type: 'TEXT' },
          { name: 'pays', type: 'TEXT' },
          { name: 'date_inscription', type: 'TEXT' },
          { name: 'fidelite_points', type: 'INTEGER' }
        ],
        data: [
          { id: 10, nom: 'Kowalski', prenom: 'Elena', email: 'elena.k@neo.io', ville: 'Bruxelles', pays: 'Belgique', date_inscription: '2023-01-12', fidelite_points: 340 },
          { id: 11, nom: 'Schneider', prenom: 'Hans', email: 'h.schneider@berlin.de', ville: 'Berlin', pays: 'Allemagne', date_inscription: '2022-06-20', fidelite_points: 1250 },
          { id: 12, nom: 'Dubois', prenom: 'Julien', email: 'julien.d@paris.fr', ville: 'Paris', pays: 'France', date_inscription: '2023-08-04', fidelite_points: 80 },
          { id: 13, nom: 'Rossi', prenom: 'Matteo', email: 'm.rossi@roma.it', ville: 'Rome', pays: 'Italie', date_inscription: '2021-11-15', fidelite_points: 2100 },
          { id: 14, nom: 'Silva', prenom: 'Ana', email: 'ana.silva@lisboa.pt', ville: 'Lisbonne', pays: 'Portugal', date_inscription: '2023-03-30', fidelite_points: 450 }
        ]
      },
      commandes: {
        name: 'commandes',
        description: 'Historique des paniers validés',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'client_id', type: 'INTEGER', foreignKey: { table: 'clients', column: 'id' } },
          { name: 'date_commande', type: 'TEXT' },
          { name: 'montant_total', type: 'REAL' },
          { name: 'statut', type: 'TEXT' }
        ],
        data: [
          { id: 501, client_id: 11, date_commande: '2023-11-01', montant_total: 1899.99, statut: 'LIVREE' },
          { id: 502, client_id: 13, date_commande: '2023-11-05', montant_total: 199.89, statut: 'LIVREE' },
          { id: 503, client_id: 10, date_commande: '2023-12-02', montant_total: 649.00, statut: 'EXPEDIEE' },
          { id: 504, client_id: 11, date_commande: '2024-01-10', montant_total: 1199.00, statut: 'LIVREE' },
          { id: 505, client_id: 14, date_commande: '2024-02-14', montant_total: 129.99, statut: 'EN_ATTENTE' },
          { id: 506, client_id: 12, date_commande: '2024-02-18', montant_total: 69.90, statut: 'ANNULEE' }
        ]
      },
      lignes_commande: {
        name: 'lignes_commande',
        description: 'Détails des articles par commande',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'commande_id', type: 'INTEGER', foreignKey: { table: 'commandes', column: 'id' } },
          { name: 'produit_id', type: 'INTEGER', foreignKey: { table: 'produits', column: 'id' } },
          { name: 'quantite', type: 'INTEGER' },
          { name: 'prix_unitaire', type: 'REAL' }
        ],
        data: [
          { id: 1, commande_id: 501, produit_id: 4, quantite: 1, prix_unitaire: 1899.99 },
          { id: 2, commande_id: 502, produit_id: 1, quantite: 1, prix_unitaire: 129.99 },
          { id: 3, commande_id: 502, produit_id: 2, quantite: 1, prix_unitaire: 69.90 },
          { id: 4, commande_id: 503, produit_id: 3, quantite: 1, prix_unitaire: 649.00 },
          { id: 5, commande_id: 504, produit_id: 5, quantite: 1, prix_unitaire: 1199.00 },
          { id: 6, commande_id: 505, produit_id: 1, quantite: 1, prix_unitaire: 129.99 },
          { id: 7, commande_id: 506, produit_id: 2, quantite: 1, prix_unitaire: 69.90 }
        ]
      }
    }
  },

  cinema: {
    id: 'cinema',
    name: 'CinéScope & Box-Office',
    description: 'Films cultes, acteurs, réalisateurs, box-office et notes du public.',
    icon: 'Film',
    tables: {
      films: {
        name: 'films',
        description: 'Catalogue des longs métrages',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'titre', type: 'TEXT' },
          { name: 'annee_sortie', type: 'INTEGER' },
          { name: 'genre', type: 'TEXT' },
          { name: 'duree_minutes', type: 'INTEGER' },
          { name: 'budget_millions', type: 'REAL' },
          { name: 'recettes_millions', type: 'REAL' },
          { name: 'note_imdb', type: 'REAL' }
        ],
        data: [
          { id: 1, titre: 'Inception', annee_sortie: 2010, genre: 'Sci-Fi', duree_minutes: 148, budget_millions: 160.0, recettes_millions: 836.8, note_imdb: 8.8 },
          { id: 2, titre: 'Interstellar', annee_sortie: 2014, genre: 'Sci-Fi', duree_minutes: 169, budget_millions: 165.0, recettes_millions: 701.7, note_imdb: 8.7 },
          { id: 3, titre: 'Pulp Fiction', annee_sortie: 1994, genre: 'Thriller', duree_minutes: 154, budget_millions: 8.5, recettes_millions: 213.9, note_imdb: 8.9 },
          { id: 4, titre: 'The Dark Knight', annee_sortie: 2008, genre: 'Action', duree_minutes: 152, budget_millions: 185.0, recettes_millions: 1005.0, note_imdb: 9.0 },
          { id: 5, titre: 'Parasite', annee_sortie: 2019, genre: 'Drame', duree_minutes: 132, budget_millions: 11.4, recettes_millions: 263.1, note_imdb: 8.5 },
          { id: 6, titre: 'Matrix', annee_sortie: 1999, genre: 'Sci-Fi', duree_minutes: 136, budget_millions: 63.0, recettes_millions: 467.2, note_imdb: 8.7 },
          { id: 7, titre: 'Whiplash', annee_sortie: 2014, genre: 'Drame', duree_minutes: 106, budget_millions: 3.3, recettes_millions: 49.0, note_imdb: 8.5 },
          { id: 8, titre: 'Blade Runner 2049', annee_sortie: 2017, genre: 'Sci-Fi', duree_minutes: 164, budget_millions: 150.0, recettes_millions: 259.2, note_imdb: 8.0 }
        ]
      },
      acteurs: {
        name: 'acteurs',
        description: 'Acteurs et actrices célèbres',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'nationalite', type: 'TEXT' },
          { name: 'annee_naissance', type: 'INTEGER' }
        ],
        data: [
          { id: 101, nom: 'Leonardo DiCaprio', nationalite: 'Américaine', annee_naissance: 1974 },
          { id: 102, nom: 'Matthew McConaughey', nationalite: 'Américaine', annee_naissance: 1969 },
          { id: 103, nom: 'Christian Bale', nationalite: 'Britannique', annee_naissance: 1974 },
          { id: 104, nom: 'Keanu Reeves', nationalite: 'Canadienne', annee_naissance: 1964 },
          { id: 105, nom: 'Ryan Gosling', nationalite: 'Canadienne', annee_naissance: 1980 },
          { id: 106, nom: 'Song Kang-ho', nationalite: 'Sud-Coréenne', annee_naissance: 1967 },
          { id: 107, nom: 'Samuel L. Jackson', nationalite: 'Américaine', annee_naissance: 1948 }
        ]
      },
      roles: {
        name: 'roles',
        description: 'Distributions et personnages',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'film_id', type: 'INTEGER', foreignKey: { table: 'films', column: 'id' } },
          { name: 'acteur_id', type: 'INTEGER', foreignKey: { table: 'acteurs', column: 'id' } },
          { name: 'personnage', type: 'TEXT' },
          { name: 'cachet_millions', type: 'REAL' }
        ],
        data: [
          { id: 1, film_id: 1, acteur_id: 101, personnage: 'Dom Cobb', cachet_millions: 20.0 },
          { id: 2, film_id: 2, acteur_id: 102, personnage: 'Cooper', cachet_millions: 15.0 },
          { id: 3, film_id: 4, acteur_id: 103, personnage: 'Bruce Wayne / Batman', cachet_millions: 30.0 },
          { id: 4, film_id: 6, acteur_id: 104, personnage: 'Neo', cachet_millions: 10.0 },
          { id: 5, film_id: 8, acteur_id: 105, personnage: 'Officer K', cachet_millions: 12.0 },
          { id: 6, film_id: 5, acteur_id: 106, personnage: 'Kim Ki-taek', cachet_millions: 2.5 },
          { id: 7, film_id: 3, acteur_id: 107, personnage: 'Jules Winnfield', cachet_millions: 0.5 }
        ]
      }
    }
  },

  hospital: {
    id: 'hospital',
    name: 'Hôpital Saint-Cybernétique',
    description: 'Dossiers médicaux, spécialistes, consultations et services de santé.',
    icon: 'Activity',
    tables: {
      medecins: {
        name: 'medecins',
        description: 'Praticiens et spécialités',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'specialite', type: 'TEXT' },
          { name: 'bureau', type: 'TEXT' },
          { name: 'tarif_consultation', type: 'REAL' }
        ],
        data: [
          { id: 1, nom: 'Dr. House', specialite: 'Diagnostic', bureau: 'B-101', tarif_consultation: 90.0 },
          { id: 2, nom: 'Dr. Grey', specialite: 'Chirurgie Générale', bureau: 'C-204', tarif_consultation: 85.0 },
          { id: 3, nom: 'Dr. Strange', specialite: 'Neurochirurgie', bureau: 'N-501', tarif_consultation: 120.0 },
          { id: 4, nom: 'Dr. Shepherd', specialite: 'Neurologie', bureau: 'N-502', tarif_consultation: 110.0 },
          { id: 5, nom: 'Dr. Wilson', specialite: 'Oncologie', bureau: 'O-303', tarif_consultation: 95.0 }
        ]
      },
      patients: {
        name: 'patients',
        description: 'Dossiers patients',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'nom', type: 'TEXT' },
          { name: 'prenom', type: 'TEXT' },
          { name: 'date_naissance', type: 'TEXT' },
          { name: 'groupe_sanguin', type: 'TEXT' },
          { name: 'allergie', type: 'TEXT' }
        ],
        data: [
          { id: 101, nom: 'Parker', prenom: 'Peter', date_naissance: '2001-08-10', groupe_sanguin: 'O+', allergie: 'Pesticides' },
          { id: 102, nom: 'Wayne', prenom: 'Bruce', date_naissance: '1985-02-19', groupe_sanguin: 'A-', allergie: 'Aucune' },
          { id: 103, nom: 'Stark', prenom: 'Tony', date_naissance: '1978-05-29', groupe_sanguin: 'B+', allergie: 'Shrapnel' },
          { id: 104, nom: 'Danvers', prenom: 'Carol', date_naissance: '1990-11-04', groupe_sanguin: 'AB+', allergie: 'Aucune' },
          { id: 105, nom: 'Banner', prenom: 'Bruce', date_naissance: '1982-12-18', groupe_sanguin: 'O-', allergie: 'Stress' }
        ]
      },
      consultations: {
        name: 'consultations',
        description: 'Visites et ordonnances',
        columns: [
          { name: 'id', type: 'INTEGER', primaryKey: true },
          { name: 'patient_id', type: 'INTEGER', foreignKey: { table: 'patients', column: 'id' } },
          { name: 'medecin_id', type: 'INTEGER', foreignKey: { table: 'medecins', column: 'id' } },
          { name: 'date_visite', type: 'TEXT' },
          { name: 'diagnostic', type: 'TEXT' },
          { name: 'duree_minutes', type: 'INTEGER' }
        ],
        data: [
          { id: 1, patient_id: 101, medecin_id: 1, date_visite: '2024-01-15', diagnostic: 'Morsure inhabituelle', duree_minutes: 45 },
          { id: 2, patient_id: 102, medecin_id: 3, date_visite: '2024-01-20', diagnostic: 'Traumatisme crânien léger', duree_minutes: 60 },
          { id: 3, patient_id: 103, medecin_id: 2, date_visite: '2024-02-02', diagnostic: 'Contrôle cardiaque', duree_minutes: 30 },
          { id: 4, patient_id: 104, medecin_id: 5, date_visite: '2024-02-10', diagnostic: 'Bilan de santé global', duree_minutes: 25 },
          { id: 5, patient_id: 105, medecin_id: 4, date_visite: '2024-02-14', diagnostic: 'Surveillance pulsation', duree_minutes: 50 },
          { id: 6, patient_id: 101, medecin_id: 2, date_visite: '2024-02-28', diagnostic: 'Point de suture', duree_minutes: 20 }
        ]
      }
    }
  }
};
