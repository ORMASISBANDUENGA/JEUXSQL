export type SQLCategory = 
  | 'SELECT'
  | 'WHERE'
  | 'ORDER_BY'
  | 'AGGREGATE'
  | 'GROUP_BY'
  | 'HAVING'
  | 'JOIN'
  | 'SUBQUERY'
  | 'ADVANCED'
  | 'DML';

export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | 'BOSS';

export type ChallengeType = 'WRITE_QUERY' | 'FIND_ERROR' | 'TIMED' | 'BOSS';

export interface ColumnSchema {
  name: string;
  type: 'INTEGER' | 'TEXT' | 'REAL' | 'BOOLEAN' | 'DATE';
  primaryKey?: boolean;
  foreignKey?: { table: string; column: string };
  nullable?: boolean;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: ColumnSchema[];
  data: Record<string, any>[];
}

export interface DatabaseDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  tables: Record<string, TableSchema>;
}

export interface SubTask {
  id: string;
  instruction: string;
  expectedQuery: string;
  hint: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: SQLCategory;
  databaseId: string;
  xpReward: Int;
  pointsReward: number;
  expectedQuery?: string;
  queryWithError?: string;
  errorDescription?: string;
  correctQuery?: string;
  timeLimitSeconds?: number;
  subTasks?: SubTask[];
  hints: string[];
  story?: string;
  bossName?: string;
  bossAvatar?: string;
  bossHp?: number;
}

type Int = number;

export type RankTitle = 'SQL Novice' | 'Query Fighter' | 'JOIN Hunter' | 'Database Warrior' | 'SQL Master';

export interface RankInfo {
  minLevel: number;
  title: RankTitle;
  badge: string;
  color: string;
  description: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  maxProgress: number;
  unlockedAt?: string;
}

export type Language = 'fr' | 'en' | 'ln' | 'sw';
export type ThemeMode = 'dark' | 'light' | 'cyberpunk';

export interface PlayerProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  lives: number;
  maxLives: number;
  totalPoints: number;
  completedChallenges: string[];
  badges: Record<string, { unlocked: boolean; progress: number; unlockedAt?: string }>;
  soundEnabled: boolean;
  theme: 'dark' | 'synthwave' | 'cyberpunk';
  themeMode?: ThemeMode;
  language?: Language;
  queryHistory: Array<{ query: string; timestamp: string; success: boolean; databaseId: string }>;
}

export interface QueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
  feedback?: {
    type: 'syntax' | 'column' | 'logic' | 'table' | 'aggregate' | 'join' | 'info';
    message: string;
    suggestion?: string;
  };
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  bonusXp?: number;
  feedback?: {
    type: string;
    message: string;
    suggestion?: string;
  };
  expectedResult?: QueryResult;
  actualResult?: QueryResult;
}

export type ViewTab = 'quests' | 'challenges' | 'minigames' | 'learn' | 'sandbox' | 'badges' | 'stats' | 'profile';

export type MiniGameMode = 'builder' | 'fill_blanks' | 'wordplay';

export interface SQLBlock {
  id: string;
  text: string;
  type: 'keyword' | 'column' | 'table' | 'operator' | 'value' | 'clause' | 'function';
}

export interface BuilderPuzzle {
  id: string;
  title: string;
  objective: string;
  category: SQLCategory;
  difficulty: Difficulty;
  databaseId: string;
  expectedQuery: string;
  availableBlocks: SQLBlock[];
  hints: string[];
  explanation: string;
}

export interface BlankOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface FillBlankQuestion {
  id: string;
  title: string;
  objective: string;
  category: SQLCategory;
  difficulty: Difficulty;
  databaseId: string;
  templateSegments: Array<{ text: string; blankIndex?: number }>;
  blanks: Array<{
    id: number;
    correctAnswer: string;
    options: string[];
    hint: string;
  }>;
  expectedFullQuery: string;
  explanation: string;
}

export interface WordAnagram {
  id: string;
  scrambled: string;
  targetWord: string;
  clue: string;
  category: string;
  usageExample: string;
}

export interface WordRiddle {
  id: string;
  title: string;
  riddle: string;
  hint: string;
  answer: string;
  associatedQuery: string;
  explanation: string;
}

