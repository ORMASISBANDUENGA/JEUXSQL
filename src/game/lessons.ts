export interface LessonSection {
  id: string;
  title: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  summary: string;
  syntax: string;
  explanation: string[];
  exampleQuery: string;
  databaseId: string;
  tips: string[];
  cheatSheet: Array<{ keyword: string; description: string; syntax: string }>;
}

export const LESSONS: LessonSection[] = [
  {
    id: 'lesson_select',
    title: '1. SELECT & Projection de Données',
    category: 'SELECT',
    difficulty: 'BEGINNER',
    summary: 'La commande fondamentale pour interroger et extraire des données d’une table relationnelle.',
    syntax: 'SELECT colonne1, colonne2 FROM nom_table;',
    explanation: [
      'SELECT définit quelles colonnes tu souhaites faire apparaître dans le résultat.',
      'Pour sélectionner TOUTES les colonnes sans les nommer une par une, utilise l\'astérisque (*).',
      'Le mot-clé AS permet de renommer une colonne dans le résultat (alias) : SELECT nom AS nom_famille FROM etudiants;',
      'DISTINCT élimine les doublons : SELECT DISTINCT ville FROM etudiants;'
    ],
    exampleQuery: 'SELECT nom, prenom, moyenne FROM etudiants LIMIT 5',
    databaseId: 'university',
    tips: [
      'En production, évite SELECT * car cela consomme plus de bande passante et de mémoire.',
      'Les noms de mots-clés SQL ne sont pas sensibles à la casse, mais la convention universelle est de les écrire en MAJUSCULES.'
    ],
    cheatSheet: [
      { keyword: 'SELECT *', description: 'Sélectionne toutes les colonnes', syntax: 'SELECT * FROM table;' },
      { keyword: 'SELECT col1, col2', description: 'Projette des colonnes spécifiques', syntax: 'SELECT col1, col2 FROM table;' },
      { keyword: 'AS alias', description: 'Renomme une colonne temporairement', syntax: 'SELECT col AS mon_nom FROM table;' },
      { keyword: 'DISTINCT', description: 'Supprime les lignes dupliquées', syntax: 'SELECT DISTINCT pays FROM clients;' }
    ]
  },
  {
    id: 'lesson_where',
    title: '2. WHERE & Filtres de Sélection',
    category: 'WHERE',
    difficulty: 'BEGINNER',
    summary: 'Filtre les lignes selon des conditions logiques et arithmétiques précises.',
    syntax: 'SELECT * FROM nom_table WHERE condition1 AND condition2;',
    explanation: [
      'La clause WHERE s’exécute avant la projection et ne conserve que les enregistrements qui satisfont le prédicat (vrai).',
      'Opérateurs de comparaison : =, != (ou <>), <, <=, >, >=',
      'Opérateurs logiques : AND (les deux vraies), OR (au moins une vraie), NOT (inversion)',
      'Plage de valeurs : WHERE age BETWEEN 18 AND 25',
      'Ensemble de valeurs : WHERE ville IN (\'Paris\', \'Lyon\', \'Bordeaux\')',
      'Recherche textuelle : WHERE nom LIKE \'Dup%\' (% = n\'importe quelle suite de caractères, _ = un seul caractère)'
    ],
    exampleQuery: "SELECT nom, prenom, filiere, moyenne FROM etudiants WHERE filiere = 'Informatique' AND moyenne >= 16.0",
    databaseId: 'university',
    tips: [
      'Pour vérifier si une colonne est vide, utilise "IS NULL" ou "IS NOT NULL" (jamais "= NULL").',
      'Encadre toujours les chaînes de texte entre guillemets simples (\'texte\').'
    ],
    cheatSheet: [
      { keyword: '=', description: 'Égalité stricte', syntax: 'WHERE age = 20' },
      { keyword: 'AND / OR', description: 'Combinaisons logiques', syntax: 'WHERE cat = 1 AND prix < 50' },
      { keyword: 'IN (...)', description: 'Appartenance à une liste', syntax: 'WHERE ville IN (\'Paris\', \'Rome\')' },
      { keyword: 'LIKE', description: 'Recherche avec motifs joker', syntax: 'WHERE email LIKE \'%@gmail.com\'' }
    ]
  },
  {
    id: 'lesson_order_limit',
    title: '3. ORDER BY & Pagination LIMIT / OFFSET',
    category: 'ORDER_BY',
    difficulty: 'BEGINNER',
    summary: 'Trier les résultats par ordre croissant ou décroissant et paginer les volumes de données.',
    syntax: 'SELECT * FROM table ORDER BY colonne ASC|DESC LIMIT nb_lignes OFFSET decalage;',
    explanation: [
      'Par défaut, les bases de données relationnelles ne garantissent aucun ordre précis sans ORDER BY.',
      'ASC (Ascendant) : de A à Z ou du plus petit au plus grand (par défaut).',
      'DESC (Descendant) : de Z à A ou du plus grand au plus petit.',
      'On peut trier sur plusieurs colonnes : ORDER BY ville ASC, moyenne DESC',
      'LIMIT n : conserve uniquement les n premières lignes.',
      'OFFSET k : saute les k premières lignes (très utilisé pour concevoir une pagination page 1, 2, 3).'
    ],
    exampleQuery: 'SELECT titre, note_imdb, annee_sortie FROM films ORDER BY note_imdb DESC LIMIT 5',
    databaseId: 'cinema',
    tips: [
      'Pour afficher le Top 3 ou Top 5 d’un classement, combine toujours ORDER BY ... DESC avec LIMIT n.'
    ],
    cheatSheet: [
      { keyword: 'ORDER BY col ASC', description: 'Tri croissant (défaut)', syntax: 'ORDER BY prix ASC' },
      { keyword: 'ORDER BY col DESC', description: 'Tri décroissant (du + grand au + petit)', syntax: 'ORDER BY note DESC' },
      { keyword: 'LIMIT n', description: 'Restreint le nombre de lignes retournées', syntax: 'LIMIT 10' },
      { keyword: 'OFFSET n', description: 'Décale le début des résultats pour la pagination', syntax: 'LIMIT 10 OFFSET 20' }
    ]
  },
  {
    id: 'lesson_aggregates',
    title: '4. Fonctions d’Agrégation (COUNT, SUM, AVG, MIN, MAX)',
    category: 'AGGREGATE',
    difficulty: 'INTERMEDIATE',
    summary: 'Calculer des métriques statistiques globales ou groupées sur des ensembles de lignes.',
    syntax: 'SELECT COUNT(*), AVG(prix), SUM(stock), MIN(prix), MAX(prix) FROM produits;',
    explanation: [
      'COUNT(*) : Compte le nombre total de lignes renvoyées.',
      'COUNT(colonne) : Compte le nombre de valeurs non-nulles dans cette colonne.',
      'SUM(colonne) : Calcule la somme arithmétique de toutes les valeurs numériques.',
      'AVG(colonne) : Calcule la moyenne arithmétique (Average).',
      'MIN(colonne) et MAX(colonne) : Trouvent respectivement la valeur la plus basse et la plus haute.'
    ],
    exampleQuery: 'SELECT COUNT(*) AS total_produits, AVG(prix) AS prix_moyen, MIN(prix) AS moins_cher, MAX(prix) AS plus_cher FROM produits',
    databaseId: 'shop',
    tips: [
      'Les fonctions d’agrégation ignorent automatiquement les valeurs NULL (sauf COUNT(*)).',
      'Donne toujours un alias explicite (ex: AS ca_total) pour rendre tes colonnes claires.'
    ],
    cheatSheet: [
      { keyword: 'COUNT(*)', description: 'Nombre total de lignes', syntax: 'SELECT COUNT(*) FROM table' },
      { keyword: 'SUM(col)', description: 'Somme cumulée', syntax: 'SELECT SUM(salaire) FROM profs' },
      { keyword: 'AVG(col)', description: 'Moyenne des valeurs', syntax: 'SELECT AVG(note) FROM notes' },
      { keyword: 'MIN / MAX', description: 'Valeur minimale ou maximale', syntax: 'SELECT MIN(prix), MAX(prix) FROM articles' }
    ]
  },
  {
    id: 'lesson_groupby',
    title: '5. GROUP BY & Partitionnement des Données',
    category: 'GROUP_BY',
    difficulty: 'INTERMEDIATE',
    summary: 'Regrouper les enregistrements ayant des valeurs communes pour leur appliquer des fonctions d’agrégation.',
    syntax: 'SELECT colonne_groupe, COUNT(*), AVG(valeur) FROM table GROUP BY colonne_groupe;',
    explanation: [
      'GROUP BY rassemble les lignes identiques selon une ou plusieurs colonnes.',
      'Règle d’or en SQL : Toute colonne présente dans le SELECT qui n\'est pas dans une fonction d’agrégation DOIT figurer dans la clause GROUP BY.',
      'On peut grouper par plusieurs colonnes : GROUP BY departement, statut'
    ],
    exampleQuery: 'SELECT filiere, COUNT(*) AS effectif, AVG(moyenne) AS moyenne_filiere FROM etudiants GROUP BY filiere ORDER BY effectif DESC',
    databaseId: 'university',
    tips: [
      'L’ordre logique d’exécution SQL est : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.'
    ],
    cheatSheet: [
      { keyword: 'GROUP BY col', description: 'Regroupe par une colonne clé', syntax: 'SELECT dept, COUNT(*) FROM profs GROUP BY dept;' },
      { keyword: 'GROUP BY col1, col2', description: 'Regroupe sur plusieurs dimensions', syntax: 'SELECT annee, genre, COUNT(*) FROM films GROUP BY annee, genre;' }
    ]
  },
  {
    id: 'lesson_having',
    title: '6. HAVING vs WHERE pour les Agrégats',
    category: 'HAVING',
    difficulty: 'INTERMEDIATE',
    summary: 'Filtrer les groupes APRÈS le calcul des agrégations (différent de WHERE qui filtre les lignes AVANT).',
    syntax: 'SELECT categorie, COUNT(*) FROM articles GROUP BY categorie HAVING COUNT(*) >= 5;',
    explanation: [
      'WHERE filtre les lignes individuelles avant le regroupement. On ne peut PAS y utiliser SUM(), AVG(), COUNT().',
      'HAVING filtre les groupes résultants après le calcul de l\'agrégation.',
      'Exemple : WHERE prix > 10 élimine les produits pas chers, puis HAVING COUNT(*) > 3 ne garde que les catégories ayant au moins 3 produits restants.'
    ],
    exampleQuery: 'SELECT genre, COUNT(*) AS nb_films, AVG(note_imdb) AS note_moyenne FROM films GROUP BY genre HAVING COUNT(*) >= 2 AND AVG(note_imdb) >= 8.0',
    databaseId: 'cinema',
    tips: [
      'Si ta condition porte sur une fonction d’agrégation (ex: SUM > 1000), utilise obligatoirement HAVING.'
    ],
    cheatSheet: [
      { keyword: 'HAVING condition', description: 'Filtre les résultats après GROUP BY', syntax: 'GROUP BY cat HAVING AVG(prix) > 100;' },
      { keyword: 'WHERE vs HAVING', description: 'WHERE = avant agrégat, HAVING = après agrégat', syntax: 'WHERE actif = 1 GROUP BY ville HAVING COUNT(*) > 5;' }
    ]
  },
  {
    id: 'lesson_inner_join',
    title: '7. INNER JOIN & Relations de Tables',
    category: 'JOIN',
    difficulty: 'INTERMEDIATE',
    summary: 'Combiner les lignes de deux tables ou plus basées sur une clé primaire et étrangère commune.',
    syntax: 'SELECT t1.col, t2.col FROM table1 t1 INNER JOIN table2 t2 ON t1.id = t2.table1_id;',
    explanation: [
      'INNER JOIN ne retourne que les lignes pour lesquelles il existe une correspondance exacte dans les deux tables.',
      'La clause ON spécifie la condition de liaison (généralement : cle_primaire = cle_etrangere).',
      'Il est vivement recommandé d’utiliser des alias de tables (ex: "e" pour etudiants, "n" pour notes) pour alléger le code.'
    ],
    exampleQuery: 'SELECT etudiants.nom, etudiants.prenom, cours.intitule, notes.note FROM notes INNER JOIN etudiants ON notes.etudiant_id = etudiants.id INNER JOIN cours ON notes.cours_id = cours.id WHERE notes.note >= 16.0',
    databaseId: 'university',
    tips: [
      'Préfixe toujours les noms de colonnes ambigus par le nom ou l’alias de la table (ex: etudiants.id).'
    ],
    cheatSheet: [
      { keyword: 'INNER JOIN ... ON', description: 'Jointure stricte avec correspondance mutuelle', syntax: 'SELECT * FROM A JOIN B ON A.id = B.a_id;' },
      { keyword: 'Alias de table', description: 'Raccourcit les noms dans la requête', syntax: 'FROM clients c JOIN commandes o ON c.id = o.client_id;' }
    ]
  },
  {
    id: 'lesson_left_right_join',
    title: '8. LEFT JOIN, RIGHT JOIN & Gestion des NULL',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    summary: 'Conserver toutes les lignes de la table de gauche (ou de droite) même s’il n’y a aucune correspondance.',
    syntax: 'SELECT * FROM table_gauche LEFT JOIN table_droite ON table_gauche.id = table_droite.fk_id;',
    explanation: [
      'LEFT JOIN conserve TOUTES les lignes de la table de gauche.',
      'Si aucune correspondance n’existe dans la table de droite, les colonnes correspondantes contiendront des valeurs NULL.',
      'Idéal pour détecter les orphelins : WHERE table_droite.id IS NULL permet de trouver les clients qui n\'ont jamais passé commande.'
    ],
    exampleQuery: 'SELECT clients.nom, clients.prenom, clients.ville, commandes.id AS commande_id, commandes.montant_total FROM clients LEFT JOIN commandes ON clients.id = commandes.client_id',
    databaseId: 'shop',
    tips: [
      'Utilise LEFT JOIN quand tu veux afficher une liste complète même si certains éléments n’ont pas d’activité associée.'
    ],
    cheatSheet: [
      { keyword: 'LEFT JOIN', description: 'Garde toute la table gauche + correspondances droites', syntax: 'FROM clients c LEFT JOIN commandes o ON c.id = o.client_id;' },
      { keyword: 'Détection d\'orphelins', description: 'Trouve les enregistrements sans liaison', syntax: 'LEFT JOIN commandes o ON c.id = o.client_id WHERE o.id IS NULL;' }
    ]
  },
  {
    id: 'lesson_self_cross_join',
    title: '9. Self-Joins & CROSS JOIN (Produit Cartésien)',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    summary: 'Joindre une table avec elle-même pour comparer des lignes ou générer toutes les combinaisons possibles.',
    syntax: 'SELECT A.nom, B.nom FROM etudiants A JOIN etudiants B ON A.filiere = B.filiere AND A.id != B.id;',
    explanation: [
      'Self-Join : On référence la même table deux fois avec des alias distincts (ex: emp JOIN emp mgr ON emp.manager_id = mgr.id).',
      'CROSS JOIN : Multiplie chaque ligne de la table A par chaque ligne de la table B (Produit cartésien de N x M lignes).'
    ],
    exampleQuery: 'SELECT p1.nom AS medecin_1, p2.nom AS medecin_2, p1.specialite FROM medecins p1 JOIN medecins p2 ON p1.specialite = p2.specialite AND p1.id < p2.id',
    databaseId: 'hospital',
    tips: [
      'Pour éviter les doublons inversés dans un self-join, utilise A.id < B.id au lieu de A.id != B.id.'
    ],
    cheatSheet: [
      { keyword: 'Self Join', description: 'Jointure d\'une table sur elle-même', syntax: 'FROM employes e JOIN employes m ON e.chef_id = m.id' },
      { keyword: 'CROSS JOIN', description: 'Toutes les combinaisons possibles (NxM)', syntax: 'FROM tailles CROSS JOIN couleurs;' }
    ]
  },
  {
    id: 'lesson_subqueries',
    title: '10. Sous-Requêtes (Subqueries & Imbrications)',
    category: 'SUBQUERY',
    difficulty: 'ADVANCED',
    summary: 'Imbriquer une requête SELECT à l’intérieur d’une autre requête dans WHERE, FROM ou SELECT.',
    syntax: 'SELECT * FROM table WHERE colonne > (SELECT AVG(colonne) FROM table);',
    explanation: [
      'Sous-requête scalaire : Retourne une seule valeur (1 ligne, 1 colonne), utilisable avec =, >, <.',
      'Sous-requête ensembliste : Retourne une colonne de plusieurs valeurs, utilisable avec IN, NOT IN, ANY, ALL.',
      'Sous-requête dans FROM (Table dérivée) : Traitée comme une table temporaire avec un alias obligatoire.'
    ],
    exampleQuery: 'SELECT nom, prenom, moyenne FROM etudiants WHERE moyenne > (SELECT AVG(moyenne) FROM etudiants)',
    databaseId: 'university',
    tips: [
      'Encadre toujours les sous-requêtes entre parenthèses (...).'
    ],
    cheatSheet: [
      { keyword: 'WHERE col IN (SELECT...)', description: 'Filtre selon la liste renvoyée', syntax: 'WHERE id IN (SELECT client_id FROM commandes);' },
      { keyword: 'WHERE val > (SELECT AVG...)', description: 'Compare à une métrique dynamique', syntax: 'WHERE salaire > (SELECT AVG(salaire) FROM profs);' }
    ]
  },
  {
    id: 'lesson_exists_correlated',
    title: '11. EXISTS, NOT EXISTS & Sous-Requêtes Corrélées',
    category: 'SUBQUERY',
    difficulty: 'ADVANCED',
    summary: 'Tester l’existence de correspondances liées dynamiquement ligne par ligne.',
    syntax: 'SELECT * FROM clients c WHERE EXISTS (SELECT 1 FROM commandes o WHERE o.client_id = c.id);',
    explanation: [
      'EXISTS s’arrête dès qu’au moins une ligne valide est trouvée dans la sous-requête, ce qui le rend très rapide.',
      'Sous-requête corrélée : La sous-requête dépend d’une valeur de la requête principale externe.',
      'NOT EXISTS permet de trouver les enregistrements n’ayant aucune relation liée.'
    ],
    exampleQuery: 'SELECT nom, prenom, ville FROM clients c WHERE EXISTS (SELECT 1 FROM commandes o WHERE o.client_id = c.id AND o.montant_total > 500)',
    databaseId: 'shop',
    tips: [
      'Dans un EXISTS, le SELECT 1 est la norme car seule la présence d’au moins une ligne importe.'
    ],
    cheatSheet: [
      { keyword: 'WHERE EXISTS (...)', description: 'Vrai si au moins 1 ligne existe', syntax: 'WHERE EXISTS (SELECT 1 FROM logs WHERE logs.user_id = u.id)' },
      { keyword: 'WHERE NOT EXISTS (...)', description: 'Vrai si aucune ligne n\'existe', syntax: 'WHERE NOT EXISTS (SELECT 1 FROM notes WHERE notes.etudiant_id = e.id)' }
    ]
  },
  {
    id: 'lesson_string_functions',
    title: '12. Fonctions Textuelles & Manipulation de Chaînes',
    category: 'FUNCTIONS',
    difficulty: 'INTERMEDIATE',
    summary: 'Transformer, formater et découper des chaînes de caractères (UPPER, LOWER, LENGTH, CONCAT, SUBSTR).',
    syntax: 'SELECT UPPER(nom), LOWER(email), LENGTH(prenom), CONCAT(nom, \' \', prenom) FROM table;',
    explanation: [
      'UPPER(str) / LOWER(str) : Convertit le texte en majuscules ou minuscules.',
      'LENGTH(str) : Renvoie le nombre de caractères.',
      'SUBSTR(str, debut, longueur) : Extrait une sous-chaîne.',
      'CONCAT(str1, str2, ...) ou opérateur || : Concatène plusieurs chaînes.'
    ],
    exampleQuery: "SELECT UPPER(nom) AS nom_maj, LOWER(email) AS email_clean, LENGTH(nom) AS taille_nom FROM etudiants LIMIT 5",
    databaseId: 'university',
    tips: [
      'Utilise LOWER() ou UPPER() pour effectuer des comparaisons insensibles à la casse.'
    ],
    cheatSheet: [
      { keyword: 'UPPER / LOWER', description: 'Convertit la casse', syntax: 'SELECT UPPER(ville), LOWER(nom) FROM clients;' },
      { keyword: 'LENGTH(str)', description: 'Longueur de la chaîne', syntax: 'WHERE LENGTH(mot_de_passe) < 8;' },
      { keyword: 'SUBSTR(str, pos, len)', description: 'Extrait un segment', syntax: 'SELECT SUBSTR(code_postal, 1, 2) FROM adresses;' }
    ]
  },
  {
    id: 'lesson_date_functions',
    title: '13. Fonctions Temporelles & Dates',
    category: 'FUNCTIONS',
    difficulty: 'INTERMEDIATE',
    summary: 'Manipuler, formater et filtrer des dates, horodatages et intervalles temporels.',
    syntax: 'SELECT date_consultation, YEAR(date_consultation) FROM consultations;',
    explanation: [
      'Les dates sont stockées au format ISO standard : YYYY-MM-DD (ex: 2026-08-20).',
      'On peut comparer les dates directement avec <, >, BETWEEN.',
      'Des fonctions permettent d’extraire l’année, le mois, le jour.'
    ],
    exampleQuery: "SELECT id, date_commande, montant_total, statut FROM commandes WHERE date_commande >= '2025-01-01' ORDER BY date_commande DESC",
    databaseId: 'shop',
    tips: [
      'Stocke toujours les dates en UTC au format ISO 8601 pour éviter tout conflit de fuseau horaire.'
    ],
    cheatSheet: [
      { keyword: 'Comparaison ISO', description: 'Filtre chronologique', syntax: "WHERE date_creation >= '2026-01-01'" },
      { keyword: 'BETWEEN dates', description: 'Période temporelle bornée', syntax: "WHERE date_event BETWEEN '2025-01-01' AND '2025-12-31'" }
    ]
  },
  {
    id: 'lesson_case_when',
    title: '14. Logique Conditionnelle CASE WHEN & COALESCE',
    category: 'CONDITIONAL',
    difficulty: 'ADVANCED',
    summary: 'Implémenter une logique "SI ... ALORS ... SINON" directement au sein d’une requête SQL.',
    syntax: 'SELECT nom, CASE WHEN moyenne >= 16 THEN \'Excellent\' WHEN moyenne >= 12 THEN \'Bien\' ELSE \'Passable\' END AS mention FROM etudiants;',
    explanation: [
      'CASE WHEN évalue séquentiellement des conditions et renvoie le résultat correspondant au premier test vrai.',
      'ELSE définit la valeur de secours si aucune condition n’est vérifiée.',
      'COALESCE(colonne, valeur_secours) : Renvoie la première valeur non-nulle de la liste (très utile pour remplacer les NULLs par 0 ou du texte).'
    ],
    exampleQuery: "SELECT nom, prenom, moyenne, CASE WHEN moyenne >= 16 THEN 'Mention Très Bien' WHEN moyenne >= 14 THEN 'Mention Bien' WHEN moyenne >= 10 THEN 'Admis' ELSE 'Ajourné' END AS appreciation FROM etudiants ORDER BY moyenne DESC",
    databaseId: 'university',
    tips: [
      'N’oublie jamais le mot-clé END pour fermer le bloc conditionnel CASE.'
    ],
    cheatSheet: [
      { keyword: 'CASE WHEN ... END', description: 'Structure conditionnelle complète', syntax: 'CASE WHEN age >= 18 THEN \'Majeur\' ELSE \'Mineur\' END' },
      { keyword: 'COALESCE(a, b)', description: 'Remplace les valeurs NULL par défaut', syntax: 'SELECT COALESCE(telephone, \'Non renseigné\') FROM clients;' }
    ]
  },
  {
    id: 'lesson_ddl_dml',
    title: '15. DDL & DML (INSERT, UPDATE, DELETE, CREATE)',
    category: 'DDL_DML',
    difficulty: 'INTERMEDIATE',
    summary: 'Créer des tables et manipuler le contenu des enregistrements dans une base.',
    syntax: 'INSERT INTO table (col1, col2) VALUES (\'val1\', 10); UPDATE table SET col1 = \'nouvelle\' WHERE id = 1; DELETE FROM table WHERE id = 1;',
    explanation: [
      'DML (Data Manipulation Language) : INSERT pour ajouter, UPDATE pour modifier, DELETE pour supprimer.',
      'DDL (Data Definition Language) : CREATE TABLE pour créer la structure, ALTER TABLE pour la modifier, DROP TABLE pour la détruire.',
      'Attention critique : N\'exécute JAMAIS un UPDATE ou un DELETE sans clause WHERE en production !'
    ],
    exampleQuery: "SELECT * FROM produits ORDER BY id DESC LIMIT 5",
    databaseId: 'shop',
    tips: [
      'Toujours tester son filtre avec un SELECT * WHERE ... avant de lancer un DELETE WHERE ...'
    ],
    cheatSheet: [
      { keyword: 'INSERT INTO', description: 'Ajout de nouvelle ligne', syntax: 'INSERT INTO clients (nom, email) VALUES (\'Alice\', \'a@mail.com\');' },
      { keyword: 'UPDATE ... SET', description: 'Mise à jour de valeurs', syntax: 'UPDATE produits SET stock = stock + 10 WHERE id = 5;' },
      { keyword: 'DELETE FROM', description: 'Suppression ciblée', syntax: 'DELETE FROM logs WHERE date < \'2024-01-01\';' },
      { keyword: 'CREATE TABLE', description: 'Création de table', syntax: 'CREATE TABLE tags (id INT PRIMARY KEY, label VARCHAR(50));' }
    ]
  },
  {
    id: 'lesson_optimization_views',
    title: '16. Vues, Indexation & Optimisation de Requêtes',
    category: 'OPTIMIZATION',
    difficulty: 'ADVANCED',
    summary: 'Accélérer les temps de réponse avec les index et encapsuler les requêtes complexes dans des vues.',
    syntax: 'CREATE VIEW vue_top_films AS SELECT titre, note_imdb FROM films WHERE note_imdb >= 8.5;',
    explanation: [
      'VIEW (Vue) : Une requête SELECT sauvegardée qui se comporte comme une table virtuelle en lecture.',
      'INDEX (Index) : Une structure d’arbre (B-Tree) qui accélère dramatiquement les recherches WHERE et les jointures ON.',
      'Optimisation : Éviter SELECT *, filtrer le plus tôt possible, indexer les clés étrangères et colonnes de filtres fréquents.'
    ],
    exampleQuery: 'SELECT titre, annee_sortie, genre, note_imdb FROM films WHERE note_imdb >= 8.5 ORDER BY note_imdb DESC',
    databaseId: 'cinema',
    tips: [
      'Un index accélère la lecture (SELECT) mais ralentit légèrement l’écriture (INSERT/UPDATE). Utilise-les de façon stratégique.'
    ],
    cheatSheet: [
      { keyword: 'CREATE VIEW', description: 'Crée une table virtuelle encapsulée', syntax: 'CREATE VIEW top_clients AS SELECT * FROM clients WHERE fidelite > 500;' },
      { keyword: 'CREATE INDEX', description: 'Indexe une colonne pour booster les perfs', syntax: 'CREATE INDEX idx_email ON clients(email);' },
      { keyword: 'EXPLAIN', description: 'Analyse le plan d\'exécution d\'une requête', syntax: 'EXPLAIN SELECT * FROM commandes WHERE client_id = 42;' }
    ]
  }
];
