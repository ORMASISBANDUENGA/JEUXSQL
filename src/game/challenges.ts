import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  // ==========================================
  // MODULE 1 : SELECT & PROJECTION DE DONNÉES
  // ==========================================
  {
    id: 'SEL_001',
    type: 'WRITE_QUERY',
    title: '1. Tous les Étudiants du Royaume',
    description: 'Affiche l’ensemble des colonnes de la table "etudiants" pour faire l’inventaire général.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'university',
    xpReward: 50,
    pointsReward: 100,
    expectedQuery: 'SELECT * FROM etudiants',
    hints: [
      'Utilise le mot-clé SELECT avec l’astérisque * pour sélectionner toutes les colonnes.',
      'Spécifie la table source avec FROM etudiants.'
    ],
    story: 'Bienvenue à l’Académie Royale du Code ! L’archiviste en chef te demande d’extraire le registre complet des élèves.'
  },
  {
    id: 'SEL_002',
    type: 'WRITE_QUERY',
    title: '2. Noms et Moyennes Académiques',
    description: 'Sélectionne uniquement le nom, le prénom et la moyenne de chaque étudiant.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'university',
    xpReward: 60,
    pointsReward: 120,
    expectedQuery: 'SELECT nom, prenom, moyenne FROM etudiants',
    hints: [
      'Énumère les colonnes séparées par une virgule : nom, prenom, moyenne',
      'N’oublie pas le FROM etudiants'
    ]
  },
  {
    id: 'SEL_003',
    type: 'WRITE_QUERY',
    title: '3. Catalogue Cyber-Boutique',
    description: 'Dans la base boutique, affiche le nom, le prix et le stock de tous les produits.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'shop',
    xpReward: 60,
    pointsReward: 120,
    expectedQuery: 'SELECT nom, prix, stock FROM produits',
    hints: [
      'Interroge la table "produits"',
      'Colonnes demandées : nom, prix, stock'
    ]
  },
  {
    id: 'SEL_004',
    type: 'WRITE_QUERY',
    title: '4. Villes Distinctes des Étudiants',
    description: 'Affiche la liste unique des villes de résidence des étudiants sans aucun doublon.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'university',
    xpReward: 65,
    pointsReward: 130,
    expectedQuery: 'SELECT DISTINCT ville FROM etudiants',
    hints: [
      'Utilise le mot-clé DISTINCT juste après SELECT.',
      'SELECT DISTINCT ville FROM etudiants'
    ]
  },
  {
    id: 'SEL_005',
    type: 'WRITE_QUERY',
    title: '5. Annuaire Médical de l’Hôpital',
    description: 'Dans la base hôpital, affiche le nom, le prénom et la spécialité de tous les médecins.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'hospital',
    xpReward: 65,
    pointsReward: 130,
    expectedQuery: 'SELECT nom, prenom, specialite FROM medecins',
    hints: [
      'Consulte la table "medecins"',
      'Colonnes : nom, prenom, specialite'
    ]
  },
  {
    id: 'SEL_006',
    type: 'WRITE_QUERY',
    title: '6. Titres et Années du Cinéma',
    description: 'Extrait le titre, l’année de sortie et la note IMDb de tous les films.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'cinema',
    xpReward: 65,
    pointsReward: 130,
    expectedQuery: 'SELECT titre, annee_sortie, note_imdb FROM films',
    hints: [
      'Table : films',
      'Colonnes : titre, annee_sortie, note_imdb'
    ]
  },

  // ==========================================
  // MODULE 2 : WHERE & FILTRAGE DE LIGNES
  // ==========================================
  {
    id: 'WHE_001',
    type: 'WRITE_QUERY',
    title: '7. Les Majors de Promotion',
    description: 'Trouve les étudiants ayant une moyenne supérieure ou égale à 16.0.',
    difficulty: 'BEGINNER',
    category: 'WHERE',
    databaseId: 'university',
    xpReward: 70,
    pointsReward: 140,
    expectedQuery: 'SELECT * FROM etudiants WHERE moyenne >= 16.0',
    hints: [
      'Ajoute une clause WHERE après FROM etudiants.',
      'Utilise l’opérateur de comparaison >= 16.0'
    ]
  },
  {
    id: 'WHE_002',
    type: 'WRITE_QUERY',
    title: '8. Informaticiens Parisiens',
    description: 'Affiche tous les étudiants de la filière "Informatique" qui résident à "Paris".',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'university',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: "SELECT * FROM etudiants WHERE filiere = 'Informatique' AND ville = 'Paris'",
    hints: [
      'Combine deux conditions avec l’opérateur logique AND.',
      "Mets les chaînes entre guillemets simples : 'Informatique' et 'Paris'."
    ]
  },
  {
    id: 'WHE_003',
    type: 'WRITE_QUERY',
    title: '9. Produits Pas Chers ou Stock Faible',
    description: 'Sélectionne le nom et le prix des produits dont le prix est inférieur à 150 OU dont le stock est inférieur à 10.',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'shop',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT nom, prix FROM produits WHERE prix < 150 OR stock < 10',
    hints: [
      'Utilise l’opérateur logique OR entre les deux conditions.',
      'SELECT nom, prix FROM produits WHERE prix < 150 OR stock < 10'
    ]
  },
  {
    id: 'WHE_004',
    type: 'WRITE_QUERY',
    title: '10. Patients du Troisième Âge',
    description: 'Dans la base hôpital, trouve tous les patients âgés de 60 ans et plus.',
    difficulty: 'BEGINNER',
    category: 'WHERE',
    databaseId: 'hospital',
    xpReward: 75,
    pointsReward: 150,
    expectedQuery: 'SELECT * FROM patients WHERE age >= 60',
    hints: [
      'Table : patients',
      'Condition : WHERE age >= 60'
    ]
  },
  {
    id: 'WHE_005',
    type: 'WRITE_QUERY',
    title: '11. Les Chefs-d’Œuvre de Science-Fiction',
    description: 'Trouve les films du genre "Science-Fiction" ayant une note IMDb strictement supérieure à 8.5.',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'cinema',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: "SELECT * FROM films WHERE genre = 'Science-Fiction' AND note_imdb > 8.5",
    hints: [
      "WHERE genre = 'Science-Fiction' AND note_imdb > 8.5"
    ]
  },
  {
    id: 'WHE_006',
    type: 'WRITE_QUERY',
    title: '12. Intervalle de Prix avec BETWEEN',
    description: 'Sélectionne le nom et le prix des produits dont le tarif est compris entre 100 et 800 (inclus).',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'shop',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT nom, prix FROM produits WHERE prix BETWEEN 100 AND 800',
    hints: [
      'Utilise la clause BETWEEN 100 AND 800.'
    ]
  },
  {
    id: 'WHE_007',
    type: 'WRITE_QUERY',
    title: '13. Recherche Textuelle avec LIKE',
    description: 'Trouve tous les clients dont l’adresse email se termine par "@gmail.com".',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'shop',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: "SELECT * FROM clients WHERE email LIKE '%@gmail.com'",
    hints: [
      "Le joker % remplace n'importe quelle chaîne : WHERE email LIKE '%@gmail.com'"
    ]
  },
  {
    id: 'WHE_008',
    type: 'WRITE_QUERY',
    title: '14. Médecins Cardiologues et Chirurgiens',
    description: 'Dans la base hôpital, sélectionne les médecins dont la spécialité est dans la liste : "Cardiologie" ou "Chirurgie".',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'hospital',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: "SELECT * FROM medecins WHERE specialite IN ('Cardiologie', 'Chirurgie')",
    hints: [
      "Utilise l'opérateur IN : WHERE specialite IN ('Cardiologie', 'Chirurgie')"
    ]
  },

  // ==========================================
  // MODULE 3 : ORDER BY & PAGINATION LIMIT / OFFSET
  // ==========================================
  {
    id: 'ORD_001',
    type: 'WRITE_QUERY',
    title: '15. Le Top 3 des Étudiants',
    description: 'Affiche le nom, prénom et moyenne des 3 étudiants ayant les meilleures moyennes.',
    difficulty: 'BEGINNER',
    category: 'ORDER_BY',
    databaseId: 'university',
    xpReward: 75,
    pointsReward: 150,
    expectedQuery: 'SELECT nom, prenom, moyenne FROM etudiants ORDER BY moyenne DESC LIMIT 3',
    hints: [
      'Trie par moyenne décroissante avec ORDER BY moyenne DESC.',
      'Restreins le nombre de résultats avec LIMIT 3.'
    ]
  },
  {
    id: 'ORD_002',
    type: 'WRITE_QUERY',
    title: '16. Produits les Plus Chers',
    description: 'Sélectionne le nom et le prix des 5 produits les plus onéreux du catalogue.',
    difficulty: 'BEGINNER',
    category: 'ORDER_BY',
    databaseId: 'shop',
    xpReward: 75,
    pointsReward: 150,
    expectedQuery: 'SELECT nom, prix FROM produits ORDER BY prix DESC LIMIT 5',
    hints: [
      'ORDER BY prix DESC LIMIT 5'
    ]
  },
  {
    id: 'ORD_003',
    type: 'WRITE_QUERY',
    title: '17. Classement des Films Récents',
    description: 'Liste tous les films triés du plus récent au plus ancien, puis par note IMDb décroissante.',
    difficulty: 'INTERMEDIATE',
    category: 'ORDER_BY',
    databaseId: 'cinema',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: 'SELECT titre, annee_sortie, note_imdb FROM films ORDER BY annee_sortie DESC, note_imdb DESC',
    hints: [
      'Spécifie les deux colonnes de tri séparées par une virgule : ORDER BY annee_sortie DESC, note_imdb DESC'
    ]
  },
  {
    id: 'ORD_004',
    type: 'WRITE_QUERY',
    title: '18. Pagination Page 2 des Patients',
    description: 'Affiche 3 patients par ordre alphabétique de nom en sautant les 3 premiers (page 2).',
    difficulty: 'INTERMEDIATE',
    category: 'ORDER_BY',
    databaseId: 'hospital',
    xpReward: 90,
    pointsReward: 180,
    expectedQuery: 'SELECT nom, prenom, age FROM patients ORDER BY nom ASC LIMIT 3 OFFSET 3',
    hints: [
      'ORDER BY nom ASC LIMIT 3 OFFSET 3'
    ]
  },
  {
    id: 'ORD_005',
    type: 'WRITE_QUERY',
    title: '19. Commandes les Plus Récentes',
    description: 'Affiche les 5 commandes les plus récentes triées par date décroissante.',
    difficulty: 'BEGINNER',
    category: 'ORDER_BY',
    databaseId: 'shop',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT * FROM commandes ORDER BY date_commande DESC LIMIT 5',
    hints: [
      'ORDER BY date_commande DESC LIMIT 5'
    ]
  },
  {
    id: 'ORD_006',
    type: 'WRITE_QUERY',
    title: '20. Professeurs par Salaire Décroissant',
    description: 'Liste le nom, le département et le salaire de tous les professeurs du plus payé au moins payé.',
    difficulty: 'BEGINNER',
    category: 'ORDER_BY',
    databaseId: 'university',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT nom, prenom, departement, salaire FROM professeurs ORDER BY salaire DESC',
    hints: [
      'ORDER BY salaire DESC'
    ]
  },

  // ==========================================
  // MODULE 4 : AGRÉGATION (COUNT, SUM, AVG, MIN, MAX)
  // ==========================================
  {
    id: 'AGG_001',
    type: 'WRITE_QUERY',
    title: '21. Effectif Total des Étudiants',
    description: 'Calcule le nombre total d’étudiants inscrits dans la table "etudiants" avec l’alias "total_etudiants".',
    difficulty: 'BEGINNER',
    category: 'AGGREGATE',
    databaseId: 'university',
    xpReward: 70,
    pointsReward: 140,
    expectedQuery: 'SELECT COUNT(*) AS total_etudiants FROM etudiants',
    hints: [
      'Utilise la fonction COUNT(*).',
      'Donne l’alias AS total_etudiants.'
    ]
  },
  {
    id: 'AGG_002',
    type: 'WRITE_QUERY',
    title: '22. Moyenne Générale Académique',
    description: 'Calcule la moyenne arithmétique de toutes les moyennes d’étudiants sous l’alias "moyenne_globale".',
    difficulty: 'BEGINNER',
    category: 'AGGREGATE',
    databaseId: 'university',
    xpReward: 75,
    pointsReward: 150,
    expectedQuery: 'SELECT AVG(moyenne) AS moyenne_globale FROM etudiants',
    hints: [
      'Utilise AVG(moyenne) AS moyenne_globale'
    ]
  },
  {
    id: 'AGG_003',
    type: 'WRITE_QUERY',
    title: '23. Chiffre d’Affaires Total des Ventes',
    description: 'Calcule la somme totale des montants de toutes les commandes enregistrées sous l’alias "ca_total".',
    difficulty: 'INTERMEDIATE',
    category: 'AGGREGATE',
    databaseId: 'shop',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: 'SELECT SUM(montant_total) AS ca_total FROM commandes',
    hints: [
      'Utilise SUM(montant_total) AS ca_total FROM commandes'
    ]
  },
  {
    id: 'AGG_004',
    type: 'WRITE_QUERY',
    title: '24. Prix Extrêmes du Catalogue',
    description: 'Trouve le prix le plus bas (alias "prix_min") et le prix le plus haut (alias "prix_max") des produits.',
    difficulty: 'INTERMEDIATE',
    category: 'AGGREGATE',
    databaseId: 'shop',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: 'SELECT MIN(prix) AS prix_min, MAX(prix) AS prix_max FROM produits',
    hints: [
      'SELECT MIN(prix) AS prix_min, MAX(prix) AS prix_max FROM produits'
    ]
  },
  {
    id: 'AGG_005',
    type: 'WRITE_QUERY',
    title: '25. Âge Moyen des Patients Hospitalisés',
    description: 'Calcule l’âge moyen des patients sous l’alias "age_moyen".',
    difficulty: 'BEGINNER',
    category: 'AGGREGATE',
    databaseId: 'hospital',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT AVG(age) AS age_moyen FROM patients',
    hints: [
      'SELECT AVG(age) AS age_moyen FROM patients'
    ]
  },
  {
    id: 'AGG_006',
    type: 'WRITE_QUERY',
    title: '26. Masse Salariale de l’Université',
    description: 'Calcule la somme totale des salaires des professeurs sous l’alias "masse_salariale".',
    difficulty: 'BEGINNER',
    category: 'AGGREGATE',
    databaseId: 'university',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT SUM(salaire) AS masse_salariale FROM professeurs',
    hints: [
      'SELECT SUM(salaire) AS masse_salariale FROM professeurs'
    ]
  },
  {
    id: 'AGG_007',
    type: 'WRITE_QUERY',
    title: '27. Durée Moyenne des Films',
    description: 'Calcule la durée moyenne en minutes de tous les films sous l’alias "duree_moyenne".',
    difficulty: 'BEGINNER',
    category: 'AGGREGATE',
    databaseId: 'cinema',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT AVG(duree_minutes) AS duree_moyenne FROM films',
    hints: [
      'SELECT AVG(duree_minutes) AS duree_moyenne FROM films'
    ]
  },

  // ==========================================
  // MODULE 5 : GROUP BY & CLUSTERISATION
  // ==========================================
  {
    id: 'GRP_001',
    type: 'WRITE_QUERY',
    title: '28. Répartition des Étudiants par Filière',
    description: 'Affiche chaque filière et le nombre d’étudiants inscrits (alias "effectif"), trié par effectif décroissant.',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'university',
    xpReward: 90,
    pointsReward: 180,
    expectedQuery: 'SELECT filiere, COUNT(*) AS effectif FROM etudiants GROUP BY filiere ORDER BY effectif DESC',
    hints: [
      'Utilise GROUP BY filiere.',
      'Trie avec ORDER BY effectif DESC.'
    ]
  },
  {
    id: 'GRP_002',
    type: 'WRITE_QUERY',
    title: '29. Salaire Moyen par Département',
    description: 'Pour chaque département professoral, affiche le département et son salaire moyen (alias "salaire_moyen").',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'university',
    xpReward: 90,
    pointsReward: 180,
    expectedQuery: 'SELECT departement, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement',
    hints: [
      'SELECT departement, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement'
    ]
  },
  {
    id: 'GRP_003',
    type: 'WRITE_QUERY',
    title: '30. Nombre de Films par Genre',
    description: 'Compte le nombre de films par genre (alias "nb_films") et affiche la note moyenne (alias "note_moyenne").',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'cinema',
    xpReward: 95,
    pointsReward: 190,
    expectedQuery: 'SELECT genre, COUNT(*) AS nb_films, AVG(note_imdb) AS note_moyenne FROM films GROUP BY genre',
    hints: [
      'GROUP BY genre avec COUNT(*) et AVG(note_imdb)'
    ]
  },
  {
    id: 'GRP_004',
    type: 'WRITE_QUERY',
    title: '31. Total Dépensé par Client',
    description: 'Affiche le client_id et le total cumulé de ses commandes (alias "total_achats") trié par total décroissant.',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'shop',
    xpReward: 100,
    pointsReward: 200,
    expectedQuery: 'SELECT client_id, SUM(montant_total) AS total_achats FROM commandes GROUP BY client_id ORDER BY total_achats DESC',
    hints: [
      'SELECT client_id, SUM(montant_total) AS total_achats FROM commandes GROUP BY client_id ORDER BY total_achats DESC'
    ]
  },
  {
    id: 'GRP_005',
    type: 'WRITE_QUERY',
    title: '32. Nombre de Consultations par Médecin',
    description: 'Dans la base hôpital, affiche le medecin_id et le nombre de consultations effectuées (alias "nb_consultations").',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'hospital',
    xpReward: 95,
    pointsReward: 190,
    expectedQuery: 'SELECT medecin_id, COUNT(*) AS nb_consultations FROM consultations GROUP BY medecin_id',
    hints: [
      'GROUP BY medecin_id'
    ]
  },
  {
    id: 'GRP_006',
    type: 'WRITE_QUERY',
    title: '33. Étudiants par Ville et Filière',
    description: 'Groupe les étudiants par ville et par filière pour compter l’effectif (alias "effectif").',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'university',
    xpReward: 100,
    pointsReward: 200,
    expectedQuery: 'SELECT ville, filiere, COUNT(*) AS effectif FROM etudiants GROUP BY ville, filiere',
    hints: [
      'GROUP BY ville, filiere'
    ]
  },

  // ==========================================
  // MODULE 6 : HAVING & FILTRAGE POST-AGRÉGATS
  // ==========================================
  {
    id: 'HAV_001',
    type: 'WRITE_QUERY',
    title: '34. Grandes Filières Populaires',
    description: 'Affiche les filières comptant au moins 3 étudiants inscrits avec leur effectif.',
    difficulty: 'INTERMEDIATE',
    category: 'HAVING',
    databaseId: 'university',
    xpReward: 105,
    pointsReward: 210,
    expectedQuery: 'SELECT filiere, COUNT(*) AS effectif FROM etudiants GROUP BY filiere HAVING COUNT(*) >= 3',
    hints: [
      'Ajoute la clause HAVING COUNT(*) >= 3 après GROUP BY filiere.'
    ]
  },
  {
    id: 'HAV_002',
    type: 'WRITE_QUERY',
    title: '35. Départements à Haut Salaire Moyen',
    description: 'Trouve les départements dont le salaire moyen des professeurs est strictement supérieur à 3500.',
    difficulty: 'INTERMEDIATE',
    category: 'HAVING',
    databaseId: 'university',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT departement, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement HAVING AVG(salaire) > 3500',
    hints: [
      'GROUP BY departement HAVING AVG(salaire) > 3500'
    ]
  },
  {
    id: 'HAV_003',
    type: 'WRITE_QUERY',
    title: '36. Genres Cinéma d’Élite',
    description: 'Affiche les genres de films ayant au moins 2 films ET une note moyenne IMDb supérieure ou égale à 8.0.',
    difficulty: 'ADVANCED',
    category: 'HAVING',
    databaseId: 'cinema',
    xpReward: 115,
    pointsReward: 230,
    expectedQuery: 'SELECT genre, COUNT(*) AS nb_films, AVG(note_imdb) AS note_moyenne FROM films GROUP BY genre HAVING COUNT(*) >= 2 AND AVG(note_imdb) >= 8.0',
    hints: [
      'HAVING COUNT(*) >= 2 AND AVG(note_imdb) >= 8.0'
    ]
  },
  {
    id: 'HAV_004',
    type: 'WRITE_QUERY',
    title: '37. Clients VIP à Fortes Dépenses',
    description: 'Trouve les client_id dont le total des commandes cumulées dépasse 1000.',
    difficulty: 'INTERMEDIATE',
    category: 'HAVING',
    databaseId: 'shop',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT client_id, SUM(montant_total) AS total_depense FROM commandes GROUP BY client_id HAVING SUM(montant_total) > 1000',
    hints: [
      'GROUP BY client_id HAVING SUM(montant_total) > 1000'
    ]
  },
  {
    id: 'HAV_005',
    type: 'WRITE_QUERY',
    title: '38. Spécialités Médicales Très Sollicitées',
    description: 'Affiche les spécialités médicales ayant plus de 2 consultations enregistrées.',
    difficulty: 'ADVANCED',
    category: 'HAVING',
    databaseId: 'hospital',
    xpReward: 120,
    pointsReward: 240,
    expectedQuery: 'SELECT medecins.specialite, COUNT(consultations.id) AS nb_consults FROM medecins JOIN consultations ON medecins.id = consultations.medecin_id GROUP BY medecins.specialite HAVING COUNT(consultations.id) > 2',
    hints: [
      'Joins medecins et consultations, GROUP BY medecins.specialite HAVING COUNT(...) > 2'
    ]
  },

  // ==========================================
  // MODULE 7 : JOINTURES INNER JOIN & MULTI-TABLES
  // ==========================================
  {
    id: 'JON_001',
    type: 'WRITE_QUERY',
    title: '39. Notes Détaillées des Étudiants',
    description: 'Affiche le nom de l’étudiant, le nom de son cours et la note obtenue en reliant les tables.',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'university',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT etudiants.nom, cours.intitule, notes.note FROM notes JOIN etudiants ON notes.etudiant_id = etudiants.id JOIN cours ON notes.cours_id = cours.id',
    hints: [
      'Relie notes à etudiants avec notes.etudiant_id = etudiants.id.',
      'Relie notes à cours avec notes.cours_id = cours.id.'
    ]
  },
  {
    id: 'JON_002',
    type: 'WRITE_QUERY',
    title: '40. Produits et Leurs Catégories',
    description: 'Affiche le nom du produit, le prix et le nom de sa catégorie (alias "categorie_nom").',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 105,
    pointsReward: 210,
    expectedQuery: 'SELECT produits.nom, produits.prix, categories.nom AS categorie_nom FROM produits JOIN categories ON produits.categorie_id = categories.id',
    hints: [
      'JOIN categories ON produits.categorie_id = categories.id'
    ]
  },
  {
    id: 'JON_003',
    type: 'WRITE_QUERY',
    title: '41. Commandes Nominatives des Clients',
    description: 'Affiche le nom du client, son prénom, la date de la commande et le montant_total.',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT clients.nom, clients.prenom, commandes.date_commande, commandes.montant_total FROM commandes JOIN clients ON commandes.client_id = clients.id',
    hints: [
      'JOIN clients ON commandes.client_id = clients.id'
    ]
  },
  {
    id: 'JON_004',
    type: 'WRITE_QUERY',
    title: '42. Casting des Acteurs de Films',
    description: 'Affiche le titre du film, le nom et prénom de l’acteur ainsi que le rôle incarné.',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'cinema',
    xpReward: 125,
    pointsReward: 250,
    expectedQuery: 'SELECT films.titre, acteurs.nom, acteurs.prenom, casting.role FROM casting JOIN films ON casting.film_id = films.id JOIN acteurs ON casting.acteur_id = acteurs.id',
    hints: [
      'Jointure triple entre casting, films et acteurs'
    ]
  },
  {
    id: 'JON_005',
    type: 'WRITE_QUERY',
    title: '43. Consultations Médicales Nominatives',
    description: 'Affiche le nom du patient, le nom du médecin, sa spécialité et le diagnostic posé.',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'hospital',
    xpReward: 130,
    pointsReward: 260,
    expectedQuery: 'SELECT patients.nom AS patient_nom, medecins.nom AS medecin_nom, medecins.specialite, consultations.diagnostic FROM consultations JOIN patients ON consultations.patient_id = patients.id JOIN medecins ON consultations.medecin_id = medecins.id',
    hints: [
      'Jointure de consultations avec patients et medecins'
    ]
  },
  {
    id: 'JON_006',
    type: 'WRITE_QUERY',
    title: '44. Articles Détaillés d’une Commande',
    description: 'Pour chaque ligne de commande, affiche l’id de commande, le nom du produit, la quantité et le prix unitaire.',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 130,
    pointsReward: 260,
    expectedQuery: 'SELECT commande_articles.commande_id, produits.nom, commande_articles.quantite, commande_articles.prix_unitaire FROM commande_articles JOIN produits ON commande_articles.produit_id = produits.id',
    hints: [
      'JOIN produits ON commande_articles.produit_id = produits.id'
    ]
  },
  {
    id: 'JON_007',
    type: 'WRITE_QUERY',
    title: '45. Moyenne Obtenue par Cours',
    description: 'Calcule pour chaque cours son intitulé et la note moyenne obtenue par les étudiants (alias "moyenne_cours").',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'university',
    xpReward: 135,
    pointsReward: 270,
    expectedQuery: 'SELECT cours.intitule, AVG(notes.note) AS moyenne_cours FROM cours JOIN notes ON cours.id = notes.cours_id GROUP BY cours.intitule',
    hints: [
      'JOIN notes ON cours.id = notes.cours_id GROUP BY cours.intitule'
    ]
  },

  // ==========================================
  // MODULE 8 : LEFT JOIN & VALEURS NULL
  // ==========================================
  {
    id: 'LJN_001',
    type: 'WRITE_QUERY',
    title: '46. Tous les Clients et Leurs Commandes',
    description: 'Affiche tous les clients (nom, prénom) et leurs commandes associées en conservant même les clients sans commande.',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 120,
    pointsReward: 240,
    expectedQuery: 'SELECT clients.nom, clients.prenom, commandes.id AS commande_id, commandes.montant_total FROM clients LEFT JOIN commandes ON clients.id = commandes.client_id',
    hints: [
      'Utilise LEFT JOIN commandes ON clients.id = commandes.client_id'
    ]
  },
  {
    id: 'LJN_002',
    type: 'WRITE_QUERY',
    title: '47. Clients Inactifs (Sans Commande)',
    description: 'Trouve les clients qui n’ont JAMAIS passé la moindre commande (détection de NULLs).',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 135,
    pointsReward: 270,
    expectedQuery: 'SELECT clients.nom, clients.prenom, clients.email FROM clients LEFT JOIN commandes ON clients.id = commandes.client_id WHERE commandes.id IS NULL',
    hints: [
      'LEFT JOIN commandes ON ... WHERE commandes.id IS NULL'
    ]
  },
  {
    id: 'LJN_003',
    type: 'WRITE_QUERY',
    title: '48. Tous les Étudiants et Leurs Notes',
    description: 'Affiche le nom de tous les étudiants et leurs notes avec LEFT JOIN.',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'university',
    xpReward: 120,
    pointsReward: 240,
    expectedQuery: 'SELECT etudiants.nom, etudiants.prenom, notes.note FROM etudiants LEFT JOIN notes ON etudiants.id = notes.etudiant_id',
    hints: [
      'LEFT JOIN notes ON etudiants.id = notes.etudiant_id'
    ]
  },
  {
    id: 'LJN_004',
    type: 'WRITE_QUERY',
    title: '49. Tous les Médecins et Leurs Consultations',
    description: 'Liste tous les médecins et le nombre de consultations qu’ils ont effectuées (0 si aucune).',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'hospital',
    xpReward: 140,
    pointsReward: 280,
    expectedQuery: 'SELECT medecins.nom, medecins.specialite, COUNT(consultations.id) AS nb_consults FROM medecins LEFT JOIN consultations ON medecins.id = consultations.medecin_id GROUP BY medecins.nom, medecins.specialite',
    hints: [
      'medecins LEFT JOIN consultations GROUP BY medecins.nom, medecins.specialite'
    ]
  },
  {
    id: 'LJN_005',
    type: 'WRITE_QUERY',
    title: '50. Catégories Sans Aucun Produit',
    description: 'Identifie les catégories de boutique qui n’ont actuellement aucun produit rattaché.',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 140,
    pointsReward: 280,
    expectedQuery: 'SELECT categories.nom FROM categories LEFT JOIN produits ON categories.id = produits.categorie_id WHERE produits.id IS NULL',
    hints: [
      'categories LEFT JOIN produits ON categories.id = produits.categorie_id WHERE produits.id IS NULL'
    ]
  },

  // ==========================================
  // MODULE 9 : SOUS-REQUÊTES & CALCULS DYNAMIQUES
  // ==========================================
  {
    id: 'SUB_001',
    type: 'WRITE_QUERY',
    title: '51. Étudiants au-dessus de la Moyenne',
    description: 'Trouve les étudiants dont la moyenne est strictement supérieure à la moyenne générale de tous les étudiants.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'university',
    xpReward: 145,
    pointsReward: 290,
    expectedQuery: 'SELECT nom, prenom, moyenne FROM etudiants WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants)',
    hints: [
      'Utilise une sous-requête : WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants)'
    ]
  },
  {
    id: 'SUB_002',
    type: 'WRITE_QUERY',
    title: '52. Produits Plus Chers que la Moyenne',
    description: 'Affiche le nom et le prix des produits dont le tarif dépasse le prix moyen de tous les articles.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'shop',
    xpReward: 145,
    pointsReward: 290,
    expectedQuery: 'SELECT nom, prix FROM produits WHERE prix > (SELECT AVG(prix) FROM produits)',
    hints: [
      'WHERE prix > (SELECT AVG(prix) FROM produits)'
    ]
  },
  {
    id: 'SUB_003',
    type: 'WRITE_QUERY',
    title: '53. Clients Ayant Acheté dans l’Électronique',
    description: 'Trouve le nom des clients ayant commandé un article de la catégorie "Électronique" via une sous-requête IN.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'shop',
    xpReward: 155,
    pointsReward: 310,
    expectedQuery: "SELECT DISTINCT clients.nom, clients.prenom FROM clients JOIN commandes ON clients.id = commandes.client_id JOIN commande_articles ON commandes.id = commande_articles.commande_id WHERE commande_articles.produit_id IN (SELECT id FROM produits WHERE categorie_id = 1)",
    hints: [
      'WHERE produit_id IN (SELECT id FROM produits WHERE categorie_id = 1)'
    ]
  },
  {
    id: 'SUB_004',
    type: 'WRITE_QUERY',
    title: '54. Films Mieux Notés que la Moyenne de leur Genre',
    description: 'Affiche les films ayant une note supérieure à la moyenne globale des films de science-fiction.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'cinema',
    xpReward: 150,
    pointsReward: 300,
    expectedQuery: "SELECT titre, note_imdb FROM films WHERE note_imdb > (SELECT AVG(note_imdb) FROM films WHERE genre = 'Science-Fiction')",
    hints: [
      "WHERE note_imdb > (SELECT AVG(note_imdb) FROM films WHERE genre = 'Science-Fiction')"
    ]
  },
  {
    id: 'SUB_005',
    type: 'WRITE_QUERY',
    title: '55. Professeurs les Mieux Rémunérés',
    description: 'Trouve les professeurs dont le salaire est égal au salaire maximal de l’université.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'university',
    xpReward: 150,
    pointsReward: 300,
    expectedQuery: 'SELECT nom, prenom, departement, salaire FROM professeurs WHERE salaire = (SELECT MAX(salaire) FROM professeurs)',
    hints: [
      'WHERE salaire = (SELECT MAX(salaire) FROM professeurs)'
    ]
  },

  // ==========================================
  // MODULE 10 : FONCTIONS TEXTUELLES & DATES
  // ==========================================
  {
    id: 'FNC_001',
    type: 'WRITE_QUERY',
    title: '56. Formatage Majuscules et Minuscules',
    description: 'Affiche le nom en majuscules (alias "nom_maj") et l’email en minuscules (alias "email_min") des étudiants.',
    difficulty: 'INTERMEDIATE',
    category: 'FUNCTIONS',
    databaseId: 'university',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT UPPER(nom) AS nom_maj, LOWER(email) AS email_min FROM etudiants',
    hints: [
      'Utilise les fonctions UPPER() et LOWER().'
    ]
  },
  {
    id: 'FNC_002',
    type: 'WRITE_QUERY',
    title: '57. Longueur des Noms de Produits',
    description: 'Affiche le nom des produits et la longueur de leur nom en caractères (alias "taille_nom").',
    difficulty: 'INTERMEDIATE',
    category: 'FUNCTIONS',
    databaseId: 'shop',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT nom, LENGTH(nom) AS taille_nom FROM produits',
    hints: [
      'Utilise LENGTH(nom) AS taille_nom'
    ]
  },
  {
    id: 'FNC_003',
    type: 'WRITE_QUERY',
    title: '58. Commandes de l’Année 2025',
    description: 'Trouve toutes les commandes passées durant l’année 2025 (du 2025-01-01 au 2025-12-31).',
    difficulty: 'INTERMEDIATE',
    category: 'FUNCTIONS',
    databaseId: 'shop',
    xpReward: 115,
    pointsReward: 230,
    expectedQuery: "SELECT * FROM commandes WHERE date_commande BETWEEN '2025-01-01' AND '2025-12-31'",
    hints: [
      "WHERE date_commande BETWEEN '2025-01-01' AND '2025-12-31'"
    ]
  },

  // ==========================================
  // MODULE 11 : CASE WHEN & LOGIQUE MÉTIER
  // ==========================================
  {
    id: 'CAS_001',
    type: 'WRITE_QUERY',
    title: '59. Mentions Honorifiques Académiques',
    description: 'Affiche le nom, la moyenne et une mention calculée : "Très Bien" si moyenne >= 16, "Bien" si >= 14, "Admis" si >= 10, sinon "Ajourné" (alias "mention").',
    difficulty: 'ADVANCED',
    category: 'CONDITIONAL',
    databaseId: 'university',
    xpReward: 160,
    pointsReward: 320,
    expectedQuery: "SELECT nom, moyenne, CASE WHEN moyenne >= 16 THEN 'Très Bien' WHEN moyenne >= 14 THEN 'Bien' WHEN moyenne >= 10 THEN 'Admis' ELSE 'Ajourné' END AS mention FROM etudiants",
    hints: [
      "CASE WHEN moyenne >= 16 THEN 'Très Bien' WHEN moyenne >= 14 THEN 'Bien' WHEN moyenne >= 10 THEN 'Admis' ELSE 'Ajourné' END AS mention"
    ]
  },
  {
    id: 'CAS_002',
    type: 'WRITE_QUERY',
    title: '60. Segment de Fidélité Client',
    description: 'Pour chaque client, affiche le nom et son statut de fidélité : "VIP Gold" si fidelite_points > 1000, "Silver" si > 500, sinon "Standard" (alias "statut_fidelite").',
    difficulty: 'ADVANCED',
    category: 'CONDITIONAL',
    databaseId: 'shop',
    xpReward: 160,
    pointsReward: 320,
    expectedQuery: "SELECT nom, prenom, fidelite_points, CASE WHEN fidelite_points > 1000 THEN 'VIP Gold' WHEN fidelite_points > 500 THEN 'Silver' ELSE 'Standard' END AS statut_fidelite FROM clients",
    hints: [
      "CASE WHEN fidelite_points > 1000 THEN 'VIP Gold' WHEN fidelite_points > 500 THEN 'Silver' ELSE 'Standard' END AS statut_fidelite"
    ]
  },

  // ==========================================
  // MODULE 12 : RAIDS DE BOSS LÉGENDAIRES MULTI-ÉTAPES
  // ==========================================
  {
    id: 'BOSS_001',
    type: 'BOSS',
    title: '👑 Boss Raid 1 : L’Audit du Doyen Corrompu',
    description: 'Une fraude académique menace la réputation de l’Université. Enchaîne 3 requêtes d’investigation pour démasquer les anomalies et rétablir la vérité !',
    difficulty: 'BOSS',
    category: 'ADVANCED',
    databaseId: 'university',
    xpReward: 350,
    pointsReward: 700,
    bossName: 'Lord Nullius, le Doyen Fantôme',
    bossAvatar: '🧙‍♂️',
    bossHp: 3,
    story: 'Lord Nullius a falsifié des données dans le grand grimoire SQL. Pour briser son bouclier runique, tu dois accomplir les 3 étapes d’investigation sans faillir !',
    subTasks: [
      {
        id: 'sub_1',
        instruction: 'Étape 1 : Trouve la note maximale (alias note_max) attribuée dans toute la table "notes".',
        expectedQuery: 'SELECT MAX(note) AS note_max FROM notes',
        hint: 'SELECT MAX(note) AS note_max FROM notes'
      },
      {
        id: 'sub_2',
        instruction: 'Étape 2 : Affiche le nom et prénom des étudiants ayant obtenu une note supérieure ou égale à 19.0 avec le nom de leur cours.',
        expectedQuery: 'SELECT etudiants.nom, etudiants.prenom, cours.intitule, notes.note FROM notes JOIN etudiants ON notes.etudiant_id = etudiants.id JOIN cours ON notes.cours_id = cours.id WHERE notes.note >= 19.0',
        hint: 'Relie "notes", "etudiants" et "cours" avec des jointures et filtre WHERE notes.note >= 19.0'
      },
      {
        id: 'sub_3',
        instruction: 'Étape 3 : Liste le salaire moyen (alias salaire_moyen) par département professoral, trié par salaire décroissant.',
        expectedQuery: 'SELECT departement, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement ORDER BY salaire_moyen DESC',
        hint: 'GROUP BY departement ORDER BY salaire_moyen DESC'
      }
    ],
    hints: [
      'Chaque étape inflige des dégâts massifs à la barre de vie du Boss.',
      'Prends ton temps pour bien structurer les jointures et agrégations.'
    ]
  },
  {
    id: 'BOSS_002',
    type: 'BOSS',
    title: '👾 Boss Raid 2 : L’Infiltration Cyber-Boutique',
    description: 'Une intelligence artificielle renégate détourne les commandes VIP. Exécute l’analyse forensique en 3 étapes pour neutraliser le Malware SQL !',
    difficulty: 'BOSS',
    category: 'ADVANCED',
    databaseId: 'shop',
    xpReward: 400,
    pointsReward: 800,
    bossName: 'Cortex-9, Virus Data-Corrupter',
    bossAvatar: '👾',
    bossHp: 3,
    story: 'Des anomalies de facturation massives viennent d’être détectées. Cortex-9 verrouille la base de données. Neutralise son processeur avec des requêtes analytiques chirurgicales !',
    subTasks: [
      {
        id: 'sub_1',
        instruction: 'Étape 1 : Calcule le montant total des ventes (alias ca_total) pour les commandes ayant le statut "LIVREE".',
        expectedQuery: "SELECT SUM(montant_total) AS ca_total FROM commandes WHERE statut = 'LIVREE'",
        hint: "SELECT SUM(montant_total) AS ca_total FROM commandes WHERE statut = 'LIVREE'"
      },
      {
        id: 'sub_2',
        instruction: 'Étape 2 : Identifie les clients ayant plus de 1000 points de fidélité avec leur ville.',
        expectedQuery: 'SELECT nom, prenom, ville, fidelite_points FROM clients WHERE fidelite_points > 1000',
        hint: 'SELECT nom, prenom, ville, fidelite_points FROM clients WHERE fidelite_points > 1000'
      },
      {
        id: 'sub_3',
        instruction: 'Étape 3 : Trouve pour chaque catégorie de produits le nombre d’articles référencés (alias nb_articles) et le prix moyen (alias prix_moyen).',
        expectedQuery: 'SELECT categories.nom, COUNT(produits.id) AS nb_articles, AVG(produits.prix) AS prix_moyen FROM categories JOIN produits ON categories.id = produits.categorie_id GROUP BY categories.nom',
        hint: 'Jointure categories et produits, GROUP BY categories.nom avec COUNT et AVG'
      }
    ],
    hints: [
      'Garde ton sang froid, valide chaque palier pour remporter la victoire légendaire !'
    ]
  },
  {
    id: 'BOSS_003',
    type: 'BOSS',
    title: '🐉 Boss Raid 3 : Le Dragon du Box-Office',
    description: 'Le Dragon Cinématographique détient les archives secrètes du 7ème art. Résous ses 3 énigmes de requêtes pour dompter la créature !',
    difficulty: 'BOSS',
    category: 'ADVANCED',
    databaseId: 'cinema',
    xpReward: 450,
    pointsReward: 900,
    bossName: 'SmaugQL, Dragon des Données',
    bossAvatar: '🐉',
    bossHp: 3,
    story: 'Au cœur de la montagne des bases de données dort SmaugQL. Seul un maître des requêtes SQL complexes peut percer ses écailles !',
    subTasks: [
      {
        id: 'sub_1',
        instruction: 'Étape 1 : Trouve le titre et la note du film ayant la note IMDb la plus élevée.',
        expectedQuery: 'SELECT titre, note_imdb FROM films WHERE note_imdb = (SELECT MAX(note_imdb) FROM films)',
        hint: 'SELECT titre, note_imdb FROM films WHERE note_imdb = (SELECT MAX(note_imdb) FROM films)'
      },
      {
        id: 'sub_2',
        instruction: 'Étape 2 : Calcule le nombre total de billets vendus dans la table "seances" sous l’alias "total_entrees".',
        expectedQuery: 'SELECT SUM(places_vendues) AS total_entrees FROM seances',
        hint: 'SELECT SUM(places_vendues) AS total_entrees FROM seances'
      },
      {
        id: 'sub_3',
        instruction: 'Étape 3 : Liste les acteurs et le nombre de films dans lesquels ils apparaissent (alias "nb_roles"), trié par nombre de rôles décroissant.',
        expectedQuery: 'SELECT acteurs.nom, acteurs.prenom, COUNT(casting.film_id) AS nb_roles FROM acteurs JOIN casting ON acteurs.id = casting.acteur_id GROUP BY acteurs.nom, acteurs.prenom ORDER BY nb_roles DESC',
        hint: 'JOIN casting ON acteurs.id = casting.acteur_id GROUP BY acteurs.nom, acteurs.prenom ORDER BY nb_roles DESC'
      }
    ],
    hints: [
      'Sous-requêtes scalaires et jointures avec agrégations te permettront de triompher !'
    ]
  }
];
