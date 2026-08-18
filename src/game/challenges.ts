import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  // ==========================================
  // MODULE 1 : SELECT & EXPLORATION (BEGINNER)
  // ==========================================
  {
    id: 'SEL_001',
    type: 'WRITE_QUERY',
    title: 'Tous les Étudiants de la Cité',
    description: 'Affiche l’ensemble des données de la table "etudiants" pour faire l’inventaire de la promotion.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'university',
    xpReward: 50,
    pointsReward: 100,
    expectedQuery: 'SELECT * FROM etudiants',
    hints: [
      'Utilise le mot-clé SELECT avec l’étoile * pour désigner toutes les colonnes.',
      'Spécifie la table source avec FROM etudiants.'
    ],
    story: 'Bienvenue à l’Université Royale du Code ! Pour ton premier jour d’apprenti mage SQL, l’archiviste te demande d’extraire l’annuaire complet des étudiants.'
  },
  {
    id: 'SEL_002',
    type: 'WRITE_QUERY',
    title: 'Noms et Moyennes Académiques',
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
    title: 'Catalogue des Produits E-Commerce',
    description: 'Dans la CyberBoutique, sélectionne le nom, le prix et le stock de tous les produits.',
    difficulty: 'BEGINNER',
    category: 'SELECT',
    databaseId: 'shop',
    xpReward: 60,
    pointsReward: 120,
    expectedQuery: 'SELECT nom, prix, stock FROM produits',
    hints: [
      'Consulte la table "produits"',
      'Colonnes demandées : nom, prix, stock'
    ]
  },

  // ==========================================
  // MODULE 2 : WHERE & FILTRAGE (BEGINNER / INTERMEDIATE)
  // ==========================================
  {
    id: 'WHE_001',
    type: 'WRITE_QUERY',
    title: 'Les Majors de Promo',
    description: 'Trouve les étudiants ayant une moyenne supérieure ou égale à 16.0.',
    difficulty: 'BEGINNER',
    category: 'WHERE',
    databaseId: 'university',
    xpReward: 70,
    pointsReward: 140,
    expectedQuery: 'SELECT * FROM etudiants WHERE moyenne >= 16.0',
    hints: [
      'Ajoute une clause WHERE après FROM etudiants.',
      'Utilise l’opérateur de comparaison >= (supérieur ou égal).'
    ]
  },
  {
    id: 'WHE_002',
    type: 'WRITE_QUERY',
    title: 'Informaticiens Parisiens',
    description: 'Affiche tous les étudiants de la filière "Informatique" qui résident dans la ville de "Paris".',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'university',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: "SELECT * FROM etudiants WHERE filiere = 'Informatique' AND ville = 'Paris'",
    hints: [
      'Combine deux conditions avec l’opérateur logique AND.',
      'Mets les valeurs textuelles entre guillemets simples : \'Informatique\' et \'Paris\'.'
    ]
  },
  {
    id: 'WHE_003',
    type: 'WRITE_QUERY',
    title: 'Produits Abordables ou en Rupture',
    description: 'Sélectionne le nom et le prix des produits dont le prix est inférieur à 150 OU dont le stock est inférieur à 10.',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'shop',
    xpReward: 80,
    pointsReward: 160,
    expectedQuery: 'SELECT nom, prix FROM produits WHERE prix < 150 OR stock < 10',
    hints: [
      'Utilise l’opérateur logique OR entre les deux conditions.',
      'Colonnes sélectionnées : nom, prix.'
    ]
  },

  // ==========================================
  // MODULE 3 : ORDER BY & LIMIT (BEGINNER / INTERMEDIATE)
  // ==========================================
  {
    id: 'ORD_001',
    type: 'WRITE_QUERY',
    title: 'Podium des Meilleurs Films',
    description: 'Affiche le titre, l’année de sortie et la note IMDB des 3 films les mieux notés, triés par note décroissante.',
    difficulty: 'INTERMEDIATE',
    category: 'ORDER_BY',
    databaseId: 'cinema',
    xpReward: 85,
    pointsReward: 170,
    expectedQuery: 'SELECT titre, annee_sortie, note_imdb FROM films ORDER BY note_imdb DESC LIMIT 3',
    hints: [
      'Utilise ORDER BY note_imdb DESC pour un ordre décroissant (du plus haut au plus bas).',
      'Ajoute LIMIT 3 à la toute fin pour ne garder que les 3 premiers.'
    ]
  },
  {
    id: 'ORD_002',
    type: 'WRITE_QUERY',
    title: 'Tarifs des Spécialistes Médicaux',
    description: 'Affiche le nom, la spécialité et le tarif des médecins triés par tarif croissant.',
    difficulty: 'BEGINNER',
    category: 'ORDER_BY',
    databaseId: 'hospital',
    xpReward: 70,
    pointsReward: 140,
    expectedQuery: 'SELECT nom, specialite, tarif_consultation FROM medecins ORDER BY tarif_consultation ASC',
    hints: [
      'Utilise ORDER BY tarif_consultation ASC (ou sans ASC car c’est par défaut).'
    ]
  },

  // ==========================================
  // MODULE 4 : FONCTIONS D’AGRÉGATION (INTERMEDIATE)
  // ==========================================
  {
    id: 'AGG_001',
    type: 'WRITE_QUERY',
    title: 'Statistiques Académiques Globales',
    description: 'Calcule le nombre total d’étudiants (alias nb_etudiants) ainsi que la moyenne générale de tous les étudiants (alias moyenne_generale).',
    difficulty: 'INTERMEDIATE',
    category: 'AGGREGATE',
    databaseId: 'university',
    xpReward: 90,
    pointsReward: 180,
    expectedQuery: 'SELECT COUNT(*) AS nb_etudiants, AVG(moyenne) AS moyenne_generale FROM etudiants',
    hints: [
      'Utilise COUNT(*) et AVG(moyenne).',
      'Donne des alias avec le mot-clé AS : COUNT(*) AS nb_etudiants, AVG(moyenne) AS moyenne_generale.'
    ]
  },
  {
    id: 'AGG_002',
    type: 'WRITE_QUERY',
    title: 'Recettes Totales du Box-Office Sci-Fi',
    description: 'Calcule la somme totale des recettes en millions (alias total_recettes) pour tous les films du genre "Sci-Fi".',
    difficulty: 'INTERMEDIATE',
    category: 'AGGREGATE',
    databaseId: 'cinema',
    xpReward: 90,
    pointsReward: 180,
    expectedQuery: "SELECT SUM(recettes_millions) AS total_recettes FROM films WHERE genre = 'Sci-Fi'",
    hints: [
      'Fonction SUM(recettes_millions) avec un filtre WHERE genre = \'Sci-Fi\'.'
    ]
  },

  // ==========================================
  // MODULE 5 : GROUP BY & HAVING (INTERMEDIATE / ADVANCED)
  // ==========================================
  {
    id: 'GRP_001',
    type: 'WRITE_QUERY',
    title: 'Moyenne par Filière Universitaire',
    description: 'Pour chaque filière, affiche le nom de la filière et la moyenne des notes de ses étudiants (alias moyenne_filiere).',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'university',
    xpReward: 100,
    pointsReward: 200,
    expectedQuery: 'SELECT filiere, AVG(moyenne) AS moyenne_filiere FROM etudiants GROUP BY filiere',
    hints: [
      'Regroupe les lignes par filière avec GROUP BY filiere.',
      'Sélectionne filiere et AVG(moyenne) AS moyenne_filiere.'
    ]
  },
  {
    id: 'GRP_002',
    type: 'WRITE_QUERY',
    title: 'Filières d’Élite (HAVING)',
    description: 'Affiche les filières ayant une moyenne générale supérieure ou égale à 15.0.',
    difficulty: 'ADVANCED',
    category: 'HAVING',
    databaseId: 'university',
    xpReward: 120,
    pointsReward: 240,
    expectedQuery: 'SELECT filiere, AVG(moyenne) AS moyenne_filiere FROM etudiants GROUP BY filiere HAVING AVG(moyenne) >= 15.0',
    hints: [
      'Pour filtrer après un regroupement GROUP BY, utilise HAVING plutôt que WHERE.',
      'Syntaxe : GROUP BY filiere HAVING AVG(moyenne) >= 15.0'
    ]
  },

  // ==========================================
  // MODULE 6 : JOINTURES RELATIONS (INTERMEDIATE / ADVANCED)
  // ==========================================
  {
    id: 'JOIN_001',
    type: 'WRITE_QUERY',
    title: 'Cours et leurs Professeurs (INNER JOIN)',
    description: 'Affiche l’intitulé du cours, le nom du professeur et son département en reliant la table "cours" et la table "professeurs".',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'university',
    xpReward: 110,
    pointsReward: 220,
    expectedQuery: 'SELECT cours.intitule, professeurs.nom, professeurs.departement FROM cours JOIN professeurs ON cours.professeur_id = professeurs.id',
    hints: [
      'Effectue une jointure : FROM cours JOIN professeurs ON cours.professeur_id = professeurs.id',
      'Sélectionne cours.intitule, professeurs.nom, professeurs.departement.'
    ]
  },
  {
    id: 'JOIN_002',
    type: 'WRITE_QUERY',
    title: 'Acteurs et Rôles dans Blade Runner',
    description: 'Relie les films, les rôles et les acteurs pour afficher le titre du film, le personnage et le nom de l’acteur pour les films sortis en 2017.',
    difficulty: 'ADVANCED',
    category: 'JOIN',
    databaseId: 'cinema',
    xpReward: 130,
    pointsReward: 260,
    expectedQuery: 'SELECT films.titre, roles.personnage, acteurs.nom FROM films JOIN roles ON films.id = roles.film_id JOIN acteurs ON roles.acteur_id = acteurs.id WHERE films.annee_sortie = 2017',
    hints: [
      'Il s’agit d’une double jointure reliant 3 tables (films -> roles -> acteurs).',
      'Ajoute la condition WHERE films.annee_sortie = 2017'
    ]
  },
  {
    id: 'JOIN_003',
    type: 'WRITE_QUERY',
    title: 'Produits avec leur Rayon E-Commerce',
    description: 'Affiche le nom du produit, son prix et le nom de sa catégorie (alias categorie) pour tous les produits.',
    difficulty: 'INTERMEDIATE',
    category: 'JOIN',
    databaseId: 'shop',
    xpReward: 100,
    pointsReward: 200,
    expectedQuery: 'SELECT produits.nom, produits.prix, categories.nom AS categorie FROM produits JOIN categories ON produits.categorie_id = categories.id',
    hints: [
      'Relie produits.categorie_id à categories.id'
    ]
  },

  // ==========================================
  // MODULE 7 : SOUS-REQUÊTES & AVANCÉ (ADVANCED / EXPERT)
  // ==========================================
  {
    id: 'SUB_001',
    type: 'WRITE_QUERY',
    title: 'Étudiants Supérieurs à la Moyenne Générale',
    description: 'Trouve tous les étudiants dont la moyenne est strictement supérieure à la moyenne de tous les étudiants réunis.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'university',
    xpReward: 140,
    pointsReward: 280,
    expectedQuery: 'SELECT nom, prenom, moyenne FROM etudiants WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants)',
    hints: [
      'Dans la clause WHERE, utilise une sous-requête entre parenthèses : (SELECT AVG(moyenne) FROM etudiants).'
    ]
  },
  {
    id: 'SUB_002',
    type: 'WRITE_QUERY',
    title: 'Clients Ayant Déjà Commandé',
    description: 'Sélectionne le nom, le prénom et l’email des clients dont l’ID figure dans la table des commandes.',
    difficulty: 'ADVANCED',
    category: 'SUBQUERY',
    databaseId: 'shop',
    xpReward: 130,
    pointsReward: 260,
    expectedQuery: 'SELECT nom, prenom, email FROM clients WHERE id IN (SELECT client_id FROM commandes)',
    hints: [
      'Utilise le mot-clé IN avec une sous-requête : WHERE id IN (SELECT client_id FROM commandes)'
    ]
  },

  // ==========================================
  // MODULE 8 : DÉFIS DE DÉBOGAGE (FIND_ERROR)
  // ==========================================
  {
    id: 'ERR_001',
    type: 'FIND_ERROR',
    title: 'Bug Détecté : Virgule & FROM Oublié',
    description: 'Un stagiaire a écrit une requête cassée pour lister les films de science-fiction. Corrige-la !',
    difficulty: 'BEGINNER',
    category: 'WHERE',
    databaseId: 'cinema',
    xpReward: 75,
    pointsReward: 150,
    queryWithError: "SELECT titre annee_sortie films WERE genre = 'Sci-Fi'",
    errorDescription: 'Il manque une virgule entre les colonnes, le mot-clé FROM avant le nom de la table, et WHERE est mal orthographié "WERE".',
    correctQuery: "SELECT titre, annee_sortie FROM films WHERE genre = 'Sci-Fi'",
    expectedQuery: "SELECT titre, annee_sortie FROM films WHERE genre = 'Sci-Fi'",
    hints: [
      'Vérifie la séparation des colonnes (virgule).',
      'Assure-toi que FROM films est présent.',
      'Corrige "WERE" en "WHERE".'
    ]
  },
  {
    id: 'ERR_002',
    type: 'FIND_ERROR',
    title: 'Bug Détecté : HAVING sans GROUP BY',
    description: 'Cette requête tente de filtrer avec HAVING sans clause GROUP BY appropriée.',
    difficulty: 'INTERMEDIATE',
    category: 'GROUP_BY',
    databaseId: 'university',
    xpReward: 95,
    pointsReward: 190,
    queryWithError: 'SELECT classe, AVG(moyenne) FROM etudiants HAVING AVG(moyenne) > 14',
    errorDescription: 'Une clause HAVING ne peut pas fonctionner sans la clause GROUP BY classe.',
    correctQuery: 'SELECT classe, AVG(moyenne) FROM etudiants GROUP BY classe HAVING AVG(moyenne) > 14',
    expectedQuery: 'SELECT classe, AVG(moyenne) FROM etudiants GROUP BY classe HAVING AVG(moyenne) > 14',
    hints: [
      'Insère "GROUP BY classe" juste avant "HAVING AVG(moyenne) > 14".'
    ]
  },

  // ==========================================
  // MODULE 9 : DÉFIS CHRONOMÉTRÉS (TIMED)
  // ==========================================
  {
    id: 'TIME_001',
    type: 'TIMED',
    title: 'Speed Code : Alerte Stock Critique',
    description: 'Alerte immédiate dans l’entrepôt ! Trouve le nom et le stock des produits ayant strictement moins de 20 unités en stock.',
    difficulty: 'INTERMEDIATE',
    category: 'WHERE',
    databaseId: 'shop',
    xpReward: 110,
    pointsReward: 250,
    timeLimitSeconds: 60,
    expectedQuery: 'SELECT nom, stock FROM produits WHERE stock < 20',
    hints: [
      'Va vite : SELECT nom, stock FROM produits WHERE stock < 20',
      'Chaque seconde économisée donne des points bonus !'
    ],
    story: 'L’alarme clignote en rouge dans l’entrepôt automatisé ! Tu as 60 secondes pour identifier les ruptures imminentes.'
  },
  {
    id: 'TIME_002',
    type: 'TIMED',
    title: 'Speed Code : Urgences Hospitalières',
    description: 'Trouve les patients du groupe sanguin "O+" ou "O-" nés après l’an 1990.',
    difficulty: 'ADVANCED',
    category: 'WHERE',
    databaseId: 'hospital',
    xpReward: 130,
    pointsReward: 300,
    timeLimitSeconds: 75,
    expectedQuery: "SELECT nom, prenom, groupe_sanguin FROM patients WHERE (groupe_sanguin = 'O+' OR groupe_sanguin = 'O-') AND date_naissance >= '1990-01-01'",
    hints: [
      'Utilise des parenthèses pour combiner (groupe_sanguin = \'O+\' OR groupe_sanguin = \'O-\')',
      'Ajoute AND date_naissance >= \'1990-01-01\''
    ],
    story: 'Le bloc opératoire a besoin de donneurs universels d’urgence ! Dépêche-toi de requêter les archives.'
  },

  // ==========================================
  // MODULE 10 : LES BOSS SQL MULTI-ÉTAPES (BOSS)
  // ==========================================
  {
    id: 'BOSS_001',
    type: 'BOSS',
    title: 'L’Audit du Doyen Corrompu',
    description: 'Une fraude académique menace la réputation de l’Université. Enchaîne 3 requêtes d’investigation pour démasquer les anomalies et rétablir la vérité !',
    difficulty: 'BOSS',
    category: 'ADVANCED',
    databaseId: 'university',
    xpReward: 300,
    pointsReward: 600,
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
    title: 'L’Infiltration Cyber-Boutique',
    description: 'Une intelligence artificielle renégate détourne les commandes VIP. Exécute l’analyse forensique en 3 étapes pour neutraliser le Malware SQL !',
    difficulty: 'BOSS',
    category: 'ADVANCED',
    databaseId: 'shop',
    xpReward: 350,
    pointsReward: 700,
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
  }
];
