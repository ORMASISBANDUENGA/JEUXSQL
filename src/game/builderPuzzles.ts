import { BuilderPuzzle } from '../types';

export const BUILDER_PUZZLES: BuilderPuzzle[] = [
  // 1. SELECT simple
  {
    id: 'build-1',
    title: '1. Les Fondations du SELECT',
    objective: 'Construis une requête pour afficher le nom, prénom et la moyenne de tous les étudiants.',
    category: 'SELECT',
    difficulty: 'BEGINNER',
    databaseId: 'university',
    expectedQuery: 'SELECT nom, prenom, moyenne FROM etudiants;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT', type: 'keyword' },
      { id: 'b2', text: 'nom, prenom, moyenne', type: 'column' },
      { id: 'b3', text: 'FROM', type: 'keyword' },
      { id: 'b4', text: 'etudiants', type: 'table' },
      { id: 'b5', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'WHERE', type: 'keyword' },
      { id: 'd2', text: 'professeurs', type: 'table' },
      { id: 'd3', text: 'nom, note', type: 'column' }
    ],
    hints: [
      'Commence par le mot-clé SELECT, suivi des noms de colonnes séparés par une virgule.',
      'Indique la table source avec FROM etudiants.'
    ],
    explanation: 'Une requête SELECT minimale se compose de SELECT <colonnes> FROM <table_cible>;'
  },

  // 2. WHERE condition
  {
    id: 'build-2',
    title: '2. Le Filtre des Majors',
    objective: 'Affiche tous les étudiants de la filière "Informatique" ayant une moyenne supérieure ou égale à 16.',
    category: 'WHERE',
    difficulty: 'BEGINNER',
    databaseId: 'university',
    expectedQuery: "SELECT * FROM etudiants WHERE filiere = 'Informatique' AND moyenne >= 16;",
    availableBlocks: [
      { id: 'b1', text: 'SELECT *', type: 'keyword' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'etudiants', type: 'table' },
      { id: 'b4', text: 'WHERE', type: 'clause' },
      { id: 'b5', text: "filiere = 'Informatique'", type: 'operator' },
      { id: 'b6', text: 'AND', type: 'operator' },
      { id: 'b7', text: 'moyenne >= 16', type: 'operator' },
      { id: 'b8', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'OR', type: 'operator' },
      { id: 'd2', text: "filiere = 'Mathématiques'", type: 'operator' },
      { id: 'd3', text: 'HAVING', type: 'clause' }
    ],
    hints: [
      'Utilise SELECT * FROM etudiants',
      'La clause WHERE combine deux conditions avec le mot-clé logique AND.'
    ],
    explanation: 'AND permet d\'exiger que les deux conditions soient simultanément vérifiées.'
  },

  // 3. ORDER BY & LIMIT
  {
    id: 'build-3',
    title: '3. Podium du Box-Office',
    objective: 'Trouve les 3 films ayant le plus grand nombre d\'entrées, ordonnés par entrées décroissantes.',
    category: 'ORDER_BY',
    difficulty: 'INTERMEDIATE',
    databaseId: 'cinema',
    expectedQuery: 'SELECT titre, annee_sortie, entrees FROM films ORDER BY entrees DESC LIMIT 3;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT titre, annee_sortie, entrees', type: 'column' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'films', type: 'table' },
      { id: 'b4', text: 'ORDER BY', type: 'clause' },
      { id: 'b5', text: 'entrees', type: 'column' },
      { id: 'b6', text: 'DESC', type: 'keyword' },
      { id: 'b7', text: 'LIMIT 3', type: 'clause' },
      { id: 'b8', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'ASC', type: 'keyword' },
      { id: 'd2', text: 'seances', type: 'table' },
      { id: 'd3', text: 'GROUP BY', type: 'clause' }
    ],
    hints: [
      'Pour classer du plus grand au plus petit, utilise ORDER BY colonne DESC.',
      'Termine par LIMIT 3 pour ne garder que les 3 premiers résultats.'
    ],
    explanation: 'ORDER BY <colonne> DESC classe par ordre décroissant et LIMIT <N> restreint le volume retourné.'
  },

  // 4. AGGREGATE COUNT & AVG
  {
    id: 'build-4',
    title: '4. Statistiques des Salaires Enseignants',
    objective: 'Calcule le nombre d\'enseignants et leur salaire moyen dans la table des professeurs.',
    category: 'AGGREGATE',
    difficulty: 'INTERMEDIATE',
    databaseId: 'university',
    expectedQuery: 'SELECT COUNT(*) AS nb_profs, AVG(salaire) AS salaire_moyen FROM professeurs;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT', type: 'keyword' },
      { id: 'b2', text: 'COUNT(*) AS nb_profs,', type: 'function' },
      { id: 'b3', text: 'AVG(salaire) AS salaire_moyen', type: 'function' },
      { id: 'b4', text: 'FROM', type: 'keyword' },
      { id: 'b5', text: 'professeurs', type: 'table' },
      { id: 'b6', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'SUM(salaire)', type: 'function' },
      { id: 'd2', text: 'WHERE salaire > 4000', type: 'clause' },
      { id: 'd3', text: 'MIN(salaire)', type: 'function' }
    ],
    hints: [
      'COUNT(*) compte les lignes et AVG(salaire) calcule la moyenne arithmétique.',
      'N\'oublie pas les alias avec le mot-clé AS.'
    ],
    explanation: 'Les fonctions d\'agrégation SQL opèrent sur un ensemble de lignes pour retourner une seule valeur scalaire.'
  },

  // 5. GROUP BY & HAVING
  {
    id: 'build-5',
    title: '5. Regroupement par Catégorie & Filtre HAVING',
    objective: 'Affiche chaque catégorie de produits et le stock total, uniquement pour les catégories ayant plus de 50 articles au total.',
    category: 'GROUP_BY',
    difficulty: 'ADVANCED',
    databaseId: 'shop',
    expectedQuery: 'SELECT categorie, SUM(stock) AS total_stock FROM produits GROUP BY categorie HAVING SUM(stock) > 50;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT categorie, SUM(stock) AS total_stock', type: 'column' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'produits', type: 'table' },
      { id: 'b4', text: 'GROUP BY', type: 'clause' },
      { id: 'b5', text: 'categorie', type: 'column' },
      { id: 'b6', text: 'HAVING', type: 'clause' },
      { id: 'b7', text: 'SUM(stock) > 50', type: 'operator' },
      { id: 'b8', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'WHERE SUM(stock) > 50', type: 'clause' },
      { id: 'd2', text: 'ORDER BY categorie', type: 'clause' },
      { id: 'd3', text: 'commandes', type: 'table' }
    ],
    hints: [
      'GROUP BY categorie permet de partitionner le calcul de SUM(stock).',
      'Attention : on utilise HAVING (et non WHERE) pour filtrer sur le résultat d\'un agrégat SUM().'
    ],
    explanation: 'HAVING filtre les groupes APRÈS agrégation, tandis que WHERE filtre les lignes individuelles AVANT agrégation.'
  },

  // 6. INNER JOIN
  {
    id: 'build-6',
    title: '6. La Jointure Sacrée des Cours & Professeurs',
    objective: 'Affiche l\'intitulé du cours et le nom du professeur assigné en liant les tables cours et professeurs.',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    databaseId: 'university',
    expectedQuery: 'SELECT c.intitule, p.nom, p.departement FROM cours c INNER JOIN professeurs p ON c.professeur_id = p.id;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT c.intitule, p.nom, p.departement', type: 'column' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'cours c', type: 'table' },
      { id: 'b4', text: 'INNER JOIN', type: 'clause' },
      { id: 'b5', text: 'professeurs p', type: 'table' },
      { id: 'b6', text: 'ON', type: 'keyword' },
      { id: 'b7', text: 'c.professeur_id = p.id', type: 'operator' },
      { id: 'b8', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'WHERE c.id = p.id', type: 'operator' },
      { id: 'd2', text: 'etudiants e', type: 'table' },
      { id: 'd3', text: 'LEFT JOIN', type: 'clause' }
    ],
    hints: [
      'Donne des alias aux tables : cours c et professeurs p.',
      'La clause ON spécifie la clé étrangère c.professeur_id = p.id.'
    ],
    explanation: 'INNER JOIN associe les lignes lorsque la clé de jointure correspond dans les deux tables.'
  },

  // 7. LEFT JOIN & IS NULL
  {
    id: 'build-7',
    title: '7. Les Médecins Sans Consultation (LEFT JOIN)',
    objective: 'Trouve les médecins qui n\'ont effectué aucune consultation enregistrée.',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    databaseId: 'hospital',
    expectedQuery: 'SELECT m.nom, m.specialite FROM medecins m LEFT JOIN consultations c ON m.id = c.medecin_id WHERE c.id IS NULL;',
    availableBlocks: [
      { id: 'b1', text: 'SELECT m.nom, m.specialite', type: 'column' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'medecins m', type: 'table' },
      { id: 'b4', text: 'LEFT JOIN', type: 'clause' },
      { id: 'b5', text: 'consultations c', type: 'table' },
      { id: 'b6', text: 'ON', type: 'keyword' },
      { id: 'b7', text: 'm.id = c.medecin_id', type: 'operator' },
      { id: 'b8', text: 'WHERE', type: 'clause' },
      { id: 'b9', text: 'c.id IS NULL', type: 'operator' },
      { id: 'b10', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'INNER JOIN', type: 'clause' },
      { id: 'd2', text: 'c.id = 0', type: 'operator' }
    ],
    hints: [
      'Un LEFT JOIN conserve tous les enregistrements de la table de gauche (medecins).',
      'Le filtre WHERE c.id IS NULL sélectionne ceux qui n\'ont aucune correspondance dans la table de droite.'
    ],
    explanation: 'L\'association LEFT JOIN + WHERE droite.id IS NULL est l\'idiome SQL par excellence pour trouver les orphelins ou éléments non liés.'
  },

  // 8. SUBQUERY Imbriquée
  {
    id: 'build-8',
    title: '8. La Sous-Requête du Salaire Supérieur',
    objective: 'Sélectionne le nom et le salaire des professeurs gagnant strictement plus que le salaire moyen de tous les professeurs.',
    category: 'SUBQUERY',
    difficulty: 'EXPERT',
    databaseId: 'university',
    expectedQuery: 'SELECT nom, salaire FROM professeurs WHERE salaire > (SELECT AVG(salaire) FROM professeurs);',
    availableBlocks: [
      { id: 'b1', text: 'SELECT nom, salaire', type: 'column' },
      { id: 'b2', text: 'FROM', type: 'keyword' },
      { id: 'b3', text: 'professeurs', type: 'table' },
      { id: 'b4', text: 'WHERE', type: 'clause' },
      { id: 'b5', text: 'salaire >', type: 'operator' },
      { id: 'b6', text: '(SELECT AVG(salaire) FROM professeurs)', type: 'clause' },
      { id: 'b7', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'HAVING salaire > AVG(salaire)', type: 'clause' },
      { id: 'd2', text: 'AVG(salaire) > salaire', type: 'operator' }
    ],
    hints: [
      'On ne peut pas mettre AVG() directement dans un WHERE standard sans sous-requête.',
      'Encadre la sous-requête avec des parenthèses : (SELECT AVG(salaire) FROM professeurs).'
    ],
    explanation: 'Une sous-requête scalaire dans le WHERE renvoie une valeur unique comparée à chaque ligne de la requête externe.'
  },

  // 9. DML UPDATE
  {
    id: 'build-9',
    title: '9. Modification DML (UPDATE & SET)',
    objective: 'Construis une instruction UPDATE pour augmenter le stock de 10 unités pour les produits de la catégorie "Audio".',
    category: 'DML',
    difficulty: 'INTERMEDIATE',
    databaseId: 'shop',
    expectedQuery: "UPDATE produits SET stock = stock + 10 WHERE categorie = 'Audio';",
    availableBlocks: [
      { id: 'b1', text: 'UPDATE', type: 'keyword' },
      { id: 'b2', text: 'produits', type: 'table' },
      { id: 'b3', text: 'SET', type: 'keyword' },
      { id: 'b4', text: 'stock = stock + 10', type: 'operator' },
      { id: 'b5', text: 'WHERE', type: 'clause' },
      { id: 'b6', text: "categorie = 'Audio'", type: 'operator' },
      { id: 'b7', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'MODIFY', type: 'keyword' },
      { id: 'd2', text: 'INTO', type: 'keyword' }
    ],
    hints: [
      'La structure DML est : UPDATE <table_cible> SET <colonne = expression> WHERE <condition>;',
      'Sans WHERE, toutes les lignes de la table seraient mises à jour !'
    ],
    explanation: 'UPDATE modifie les données existantes de la table spécifiée selon les filtres du WHERE.'
  },

  // 10. DML INSERT INTO
  {
    id: 'build-10',
    title: '10. Insertion de Données (INSERT INTO)',
    objective: 'Insère un nouvel étudiant dans la table etudiants avec id 11, nom "Lovelace", prenom "Ada", age 22, filiere "Data Science", moyenne 19.5.',
    category: 'DML',
    difficulty: 'INTERMEDIATE',
    databaseId: 'university',
    expectedQuery: "INSERT INTO etudiants (id, nom, prenom, age, filiere, moyenne) VALUES (11, 'Lovelace', 'Ada', 22, 'Data Science', 19.5);",
    availableBlocks: [
      { id: 'b1', text: 'INSERT INTO', type: 'keyword' },
      { id: 'b2', text: 'etudiants', type: 'table' },
      { id: 'b3', text: '(id, nom, prenom, age, filiere, moyenne)', type: 'column' },
      { id: 'b4', text: 'VALUES', type: 'keyword' },
      { id: 'b5', text: "(11, 'Lovelace', 'Ada', 22, 'Data Science', 19.5)", type: 'value' },
      { id: 'b6', text: ';', type: 'operator' },
      // Distractors
      { id: 'd1', text: 'ADD TO', type: 'keyword' },
      { id: 'd2', text: 'SET VALUES', type: 'keyword' }
    ],
    hints: [
      'Utilise la syntaxe standard : INSERT INTO <table> (colonnes) VALUES (valeurs);'
    ],
    explanation: 'INSERT INTO permet d\'ajouter une nouvelle ligne dans une table relationnelle.'
  }
];
