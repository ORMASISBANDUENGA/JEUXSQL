import { FillBlankQuestion } from '../types';

export const FILL_BLANK_QUESTIONS: FillBlankQuestion[] = [
  {
    id: 'fb-1',
    title: '1. Projection & Sélection Unique',
    objective: 'Complète la requête pour lister sans doublons toutes les villes des étudiants.',
    category: 'SELECT',
    difficulty: 'BEGINNER',
    databaseId: 'university',
    templateSegments: [
      { text: 'SELECT ' },
      { text: '', blankIndex: 0 },
      { text: ' ville ' },
      { text: '', blankIndex: 1 },
      { text: ' etudiants;' }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'DISTINCT',
        options: ['DISTINCT', 'UNIQUE', 'ALL', 'ONLY'],
        hint: 'Le mot-clé pour éliminer les doublons dans le résultat SELECT.'
      },
      {
        id: 1,
        correctAnswer: 'FROM',
        options: ['FROM', 'IN', 'INTO', 'OF'],
        hint: 'Clause spécifiant la table source.'
      }
    ],
    expectedFullQuery: 'SELECT DISTINCT ville FROM etudiants;',
    explanation: 'SELECT DISTINCT permet d\'extraire les valeurs uniques sans répétitions.'
  },

  {
    id: 'fb-2',
    title: '2. Filtrage par Intervalle et Texte',
    objective: 'Filtre les produits dont le prix est compris entre 100 et 1000 et dont le nom commence par "C".',
    category: 'WHERE',
    difficulty: 'INTERMEDIATE',
    databaseId: 'shop',
    templateSegments: [
      { text: 'SELECT * FROM produits WHERE prix ' },
      { text: '', blankIndex: 0 },
      { text: ' 100 AND 1000 AND nom ' },
      { text: '', blankIndex: 1 },
      { text: " 'C%';" }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'BETWEEN',
        options: ['BETWEEN', 'IN', 'INSIDE', 'RANGE'],
        hint: 'Opérateur pour tester l\'appartenance à un intervalle continu borné.'
      },
      {
        id: 1,
        correctAnswer: 'LIKE',
        options: ['LIKE', 'MATCH', 'EQUALS', 'CONTAINS'],
        hint: 'Opérateur de comparaison textuelle avec jokers % et _.'
      }
    ],
    expectedFullQuery: "SELECT * FROM produits WHERE prix BETWEEN 100 AND 1000 AND nom LIKE 'C%';",
    explanation: 'BETWEEN vérifie l\'intervalle inclusif et LIKE avec % teste le préfixe textuel.'
  },

  {
    id: 'fb-3',
    title: '3. Agrégation & Regroupement avec Filtre Post-Agrégat',
    objective: 'Compte le nombre de consultations par médecin et ne garde que ceux ayant au moins 2 consultations.',
    category: 'GROUP_BY',
    difficulty: 'ADVANCED',
    databaseId: 'hospital',
    templateSegments: [
      { text: 'SELECT medecin_id, ' },
      { text: '', blankIndex: 0 },
      { text: '(*) AS nb_consultations FROM consultations ' },
      { text: '', blankIndex: 1 },
      { text: ' medecin_id ' },
      { text: '', blankIndex: 2 },
      { text: ' COUNT(*) >= 2;' }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'COUNT',
        options: ['COUNT', 'SUM', 'TOTAL', 'LENGTH'],
        hint: 'Fonction d\'agrégation pour compter les lignes d\'un groupe.'
      },
      {
        id: 1,
        correctAnswer: 'GROUP BY',
        options: ['GROUP BY', 'ORDER BY', 'PARTITION BY', 'CLUSTER BY'],
        hint: 'Clause pour créer des groupes de lignes par valeur de colonne.'
      },
      {
        id: 2,
        correctAnswer: 'HAVING',
        options: ['HAVING', 'WHERE', 'WHEN', 'FILTER'],
        hint: 'Clause pour filtrer sur les agrégats après regroupement.'
      }
    ],
    expectedFullQuery: 'SELECT medecin_id, COUNT(*) AS nb_consultations FROM consultations GROUP BY medecin_id HAVING COUNT(*) >= 2;',
    explanation: 'GROUP BY regroupe les enregistrements et HAVING applique la condition sur COUNT(*).'
  },

  {
    id: 'fb-4',
    title: '4. Jointure Interne Relationnelle',
    objective: 'Associe chaque commande avec les informations du client correspondant.',
    category: 'JOIN',
    difficulty: 'ADVANCED',
    databaseId: 'shop',
    templateSegments: [
      { text: 'SELECT c.id, cl.nom, cl.email, c.montant_total FROM commandes c ' },
      { text: '', blankIndex: 0 },
      { text: ' clients cl ' },
      { text: '', blankIndex: 1 },
      { text: ' c.client_id = cl.id;' }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'INNER JOIN',
        options: ['INNER JOIN', 'MERGE', 'UNION', 'CROSS'],
        hint: 'Type de jointure qui ne retourne que les lignes correspondantes.'
      },
      {
        id: 1,
        correctAnswer: 'ON',
        options: ['ON', 'WHERE', 'USING', 'WITH'],
        hint: 'Mot-clé qui introduit la condition de correspondance des clés.'
      }
    ],
    expectedFullQuery: 'SELECT c.id, cl.nom, cl.email, c.montant_total FROM commandes c INNER JOIN clients cl ON c.client_id = cl.id;',
    explanation: 'INNER JOIN avec la clause ON est la manière canonique de lier des tables par clé primaire / étrangère.'
  },

  {
    id: 'fb-5',
    title: '5. Valeurs Manquantes & Tri Ordonné',
    objective: 'Trouve les patients dont le groupe sanguin est renseigné (non nul) et trie-les du plus âgé au plus jeune.',
    category: 'ORDER_BY',
    difficulty: 'INTERMEDIATE',
    databaseId: 'hospital',
    templateSegments: [
      { text: 'SELECT * FROM patients WHERE groupe_sanguin ' },
      { text: '', blankIndex: 0 },
      { text: ' NULL ORDER BY age ' },
      { text: '', blankIndex: 1 },
      { text: ';' }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'IS NOT',
        options: ['IS NOT', '!=', '<>', 'NOT EQUAL'],
        hint: 'Opérateur SQL correct pour tester la non-nullité.'
      },
      {
        id: 1,
        correctAnswer: 'DESC',
        options: ['DESC', 'ASC', 'DOWN', 'MAX'],
        hint: 'Mot-clé pour spécifier un ordre décroissant.'
      }
    ],
    expectedFullQuery: 'SELECT * FROM patients WHERE groupe_sanguin IS NOT NULL ORDER BY age DESC;',
    explanation: 'On ne compare jamais NULL avec != en SQL; on utilise IS NOT NULL.'
  },

  {
    id: 'fb-6',
    title: '6. Sous-Requête dans le WHERE (IN)',
    objective: 'Sélectionne tous les films réalisés par les réalisateurs de nationalité "USA".',
    category: 'SUBQUERY',
    difficulty: 'EXPERT',
    databaseId: 'cinema',
    templateSegments: [
      { text: 'SELECT titre, annee_sortie FROM films WHERE realisateur_id ' },
      { text: '', blankIndex: 0 },
      { text: ' (' },
      { text: '', blankIndex: 1 },
      { text: " id FROM realisateurs WHERE nationalite = 'USA');" }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'IN',
        options: ['IN', '=', 'EXISTS', 'CONTAINS'],
        hint: 'Opérateur pour tester si une valeur appartient à une liste retournée par une sous-requête.'
      },
      {
        id: 1,
        correctAnswer: 'SELECT',
        options: ['SELECT', 'EXTRACT', 'GET', 'FIND'],
        hint: 'Mot-clé débutant la sous-requête interne.'
      }
    ],
    expectedFullQuery: "SELECT titre, annee_sortie FROM films WHERE realisateur_id IN (SELECT id FROM realisateurs WHERE nationalite = 'USA');",
    explanation: 'WHERE id IN (SELECT ...) filtre les éléments appartenant au résultat de la sous-requête.'
  },

  {
    id: 'fb-7',
    title: '7. Suppression Conditionnelle DML (DELETE)',
    objective: 'Supprime les commandes dont le statut est "Annulée".',
    category: 'DML',
    difficulty: 'INTERMEDIATE',
    databaseId: 'shop',
    templateSegments: [
      { text: '', blankIndex: 0 },
      { text: ' ' },
      { text: '', blankIndex: 1 },
      { text: " commandes WHERE statut = 'Annulée';" }
    ],
    blanks: [
      {
        id: 0,
        correctAnswer: 'DELETE',
        options: ['DELETE', 'REMOVE', 'DROP', 'ERASE'],
        hint: 'Commande DML pour supprimer des lignes d\'une table.'
      },
      {
        id: 1,
        correctAnswer: 'FROM',
        options: ['FROM', 'INTO', 'TABLE', 'OF'],
        hint: 'Spécifie la table cible de suppression.'
      }
    ],
    expectedFullQuery: "DELETE FROM commandes WHERE statut = 'Annulée';",
    explanation: 'DELETE FROM <table_cible> WHERE <condition>; supprime uniquement les lignes ciblées.'
  }
];
