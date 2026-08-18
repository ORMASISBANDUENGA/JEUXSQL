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
    syntax: 'SELECT * FROM table ORDER BY colonne ASC|DESC LIMIT nb_lignes;',
    explanation: [
      'Par défaut, les bases de données relationnelles ne garantissent aucun ordre précis sans ORDER BY.',
      'ASC (Ascendant) : de A à Z ou du plus petit au plus grand (par défaut).',
      'DESC (Descendant) : de Z à A ou du plus grand au plus petit.',
      'On peut trier sur plusieurs colonnes : ORDER BY ville ASC, moyenne DESC',
      'LIMIT n : conserve uniquement les n premières lignes.',
      'OFFSET k : saute les k premières lignes (utile pour la pagination page 2, page 3...).'
    ],
    exampleQuery: 'SELECT titre, note_imdb, annee_sortie FROM films ORDER BY note_imdb DESC LIMIT 5',
    databaseId: 'cinema',
    tips: [
      'Pour afficher le Top 3 d’un classement, combine toujours ORDER BY ... DESC avec LIMIT 3.'
    ],
    cheatSheet: [
      { keyword: 'ORDER BY col ASC', description: 'Tri croissant (défaut)', syntax: 'ORDER BY prix ASC' },
      { keyword: 'ORDER BY col DESC', description: 'Tri décroissant (du + grand au + petit)', syntax: 'ORDER BY note DESC' },
      { keyword: 'LIMIT n', description: 'Restreint le nombre de lignes retournées', syntax: 'LIMIT 10' },
      { keyword: 'OFFSET n', description: 'Décale le début des résultats', syntax: 'LIMIT 10 OFFSET 20' }
    ]
  },
  {
    id: 'lesson_aggregates',
    title: '4. Fonctions d’Agrégation & Statistiques',
    category: 'AGGREGATE',
    difficulty: 'INTERMEDIATE',
    summary: 'Calculer des totaux, moyennes, extrêmes et dénombrements sur des ensembles de lignes.',
    syntax: 'SELECT COUNT(*), AVG(colonne), SUM(colonne), MIN(colonne), MAX(colonne) FROM table;',
    explanation: [
      'COUNT(*) : compte le nombre total de lignes retournées.',
      'COUNT(colonne) : compte le nombre de valeurs non-nulles dans cette colonne.',
      'SUM(colonne) : calcule la somme totale des valeurs numériques.',
      'AVG(colonne) : calcule la moyenne arithmétique.',
      'MIN(colonne) / MAX(colonne) : extrait la plus petite / plus grande valeur.'
    ],
    exampleQuery: 'SELECT COUNT(*) AS nb_films, AVG(recettes_millions) AS moyenne_recettes, MAX(note_imdb) AS note_record FROM films',
    databaseId: 'cinema',
    tips: [
      'Donne toujours un alias explicite (AS mon_alias) aux fonctions d’agrégation pour clarifier les en-têtes du tableau.'
    ],
    cheatSheet: [
      { keyword: 'COUNT(*)', description: 'Nombre total de lignes', syntax: 'SELECT COUNT(*) FROM table;' },
      { keyword: 'SUM(col)', description: 'Somme des valeurs numériques', syntax: 'SELECT SUM(total) FROM commandes;' },
      { keyword: 'AVG(col)', description: 'Moyenne arithmétique', syntax: 'SELECT AVG(note) FROM notes;' },
      { keyword: 'MIN / MAX', description: 'Valeur minimale ou maximale', syntax: 'SELECT MIN(prix), MAX(prix) FROM produits;' }
    ]
  },
  {
    id: 'lesson_group_having',
    title: '5. GROUP BY & Filtre HAVING',
    category: 'GROUP_BY',
    difficulty: 'INTERMEDIATE',
    summary: 'Segmenter des données par catégorie et filtrer les résultats agrégés.',
    syntax: 'SELECT categorie, COUNT(*), AVG(prix) FROM produits GROUP BY categorie HAVING AVG(prix) > 100;',
    explanation: [
      'GROUP BY rassemble les lignes ayant la même valeur dans une ou plusieurs colonnes pour leur appliquer une fonction d\'agrégation.',
      'Règle d’or : Toute colonne dans le SELECT qui n\'est pas dans une fonction d\'agrégation DOIT être déclarée dans le GROUP BY.',
      'Différence entre WHERE et HAVING :',
      '- WHERE filtre les lignes individuelles AVANT le regroupement.',
      '- HAVING filtre les groupes APRÈS le calcul de l\'agrégation.'
    ],
    exampleQuery: 'SELECT departement, COUNT(*) AS nb_profs, AVG(salaire) AS salaire_moyen FROM professeurs GROUP BY departement HAVING AVG(salaire) > 4400',
    databaseId: 'university',
    tips: [
      'Tu ne peux pas utiliser d’alias créé dans le SELECT à l’intérieur du WHERE, mais tu peux utiliser les fonctions d’agrégation dans le HAVING.'
    ],
    cheatSheet: [
      { keyword: 'GROUP BY col', description: 'Groupe les enregistrements', syntax: 'GROUP BY pays' },
      { keyword: 'HAVING condition', description: 'Filtre les agrégats de groupes', syntax: 'HAVING COUNT(*) > 5' }
    ]
  },
  {
    id: 'lesson_joins',
    title: '6. JOINTURES (INNER, LEFT, Multi-Tables)',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    summary: 'Combiner les colonnes de plusieurs tables en reliant leurs clés primaires et étrangères.',
    syntax: 'SELECT a.col, b.col FROM table_A a JOIN table_B b ON a.fk_id = b.id;',
    explanation: [
      'INNER JOIN (ou JOIN) : ne retourne que les lignes qui ont une correspondance dans les deux tables.',
      'LEFT JOIN : retourne toutes les lignes de la table de gauche, avec les valeurs correspondantes de la table de droite (ou NULL si aucune correspondance).',
      'RIGHT JOIN : l\'inverse du LEFT JOIN (toutes les lignes de la table de droite).',
      'FULL OUTER JOIN : combine les deux tables en incluant toutes les lignes et des NULL là où il n\'y a pas de match.',
      'On peut enchaîner plusieurs JOIN pour relier 3, 4 tables ou plus !'
    ],
    exampleQuery: 'SELECT etudiants.nom, etudiants.prenom, cours.intitule, notes.note FROM notes JOIN etudiants ON notes.etudiant_id = etudiants.id JOIN cours ON notes.cours_id = cours.id WHERE notes.note >= 18',
    databaseId: 'university',
    tips: [
      'Préfixe toujours les colonnes par le nom de leur table (ex: etudiants.nom) pour éviter les erreurs d’ambiguïté si les deux tables ont une colonne "nom" ou "id".'
    ],
    cheatSheet: [
      { keyword: 'INNER JOIN', description: 'Intersection stricte des deux tables', syntax: 'FROM t1 JOIN t2 ON t1.id = t2.fk_id' },
      { keyword: 'LEFT JOIN', description: 'Toutes les lignes de gauche + matches', syntax: 'FROM t1 LEFT JOIN t2 ON t1.id = t2.fk_id' },
      { keyword: 'ON condition', description: 'Condition de correspondance des clés', syntax: 'ON client.id = commande.client_id' }
    ]
  },
  {
    id: 'lesson_subqueries',
    title: '7. Sous-Requêtes & Prédicats Imbriqués',
    category: 'SUBQUERY',
    difficulty: 'ADVANCED',
    summary: 'Exécuter une requête à l’intérieur d’une autre pour réaliser des comparaisons dynamiques.',
    syntax: 'SELECT * FROM table WHERE col > (SELECT AVG(col) FROM table);',
    explanation: [
      'Une sous-requête (subquery) est une requête SELECT imbriquée entre parenthèses.',
      'Sous-requête scalaire : retourne une seule valeur (ex: un nombre), utilisable avec =, <, >...',
      'Sous-requête multi-valeurs : utilisable avec IN, NOT IN, ANY, ALL.',
      'Exemple : WHERE client_id IN (SELECT id FROM clients WHERE pays = \'France\')',
      'Sous-requête corrélée : fait référence à une colonne de la requête principale.'
    ],
    exampleQuery: 'SELECT nom, prenom, moyenne FROM etudiants WHERE moyenne >= (SELECT AVG(moyenne) FROM etudiants)',
    databaseId: 'university',
    tips: [
      'Vérifie bien que ta sous-requête retourne le format attendu (une valeur scalaire ou une seule colonne pour IN).'
    ],
    cheatSheet: [
      { keyword: 'WHERE col IN (SELECT...)', description: 'Filtre par ensemble dynamique', syntax: 'WHERE id IN (SELECT fk FROM t2)' },
      { keyword: 'WHERE col > (SELECT...)', description: 'Comparaison à un scalaire calculé', syntax: 'WHERE prix > (SELECT AVG(prix) FROM p)' },
      { keyword: 'EXISTS (SELECT 1...)', description: 'Teste l’existence d’au moins 1 ligne', syntax: 'WHERE EXISTS (SELECT 1 FROM rel WHERE ...)' }
    ]
  }
];
