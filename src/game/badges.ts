import { Badge, PlayerProfile } from '../types';

export const ALL_BADGES: Badge[] = [
  {
    id: 'SELECT_ROOKIE',
    name: 'SELECT Rookie',
    description: 'Complète 3 défis de sélection SELECT.',
    icon: 'Sparkles',
    category: 'SELECT',
    maxProgress: 3
  },
  {
    id: 'WHERE_WARRIOR',
    name: 'WHERE Warrior',
    description: 'Complète 3 défis avec des filtres WHERE et opérateurs logiques.',
    icon: 'Filter',
    category: 'WHERE',
    maxProgress: 3
  },
  {
    id: 'JOIN_HUNTER',
    name: 'JOIN Hunter',
    description: 'Maîtrise les jointures INNER et LEFT dans 3 défis.',
    icon: 'Link',
    category: 'JOIN',
    maxProgress: 3
  },
  {
    id: 'AGGREGATE_ACE',
    name: 'Aggregate Ace',
    description: 'Calcule des totaux, moyennes ou comptages via COUNT, AVG, SUM.',
    icon: 'Calculator',
    category: 'AGGREGATE',
    maxProgress: 3
  },
  {
    id: 'GROUP_GURU',
    name: 'GROUP BY Guru',
    description: 'Regroupe et filtre les agrégats avec HAVING.',
    icon: 'Layers',
    category: 'GROUP_BY',
    maxProgress: 2
  },
  {
    id: 'QUERY_STREAK_3',
    name: 'Flamme Ardente',
    description: 'Atteins une série active (streak) de 3 défis consécutifs réussis.',
    icon: 'Flame',
    category: 'STREAK',
    maxProgress: 3
  },
  {
    id: 'SPEED_CODER',
    name: 'Speed Coder',
    description: 'Réussis un défi chronométré avec plus de 15 secondes d’avance.',
    icon: 'Zap',
    category: 'SPEED',
    maxProgress: 1
  },
  {
    id: 'BUG_HUNTER',
    name: 'Bug Hunter',
    description: 'Trouve et corrige 2 erreurs de syntaxe dans les défis Débogage.',
    icon: 'ShieldAlert',
    category: 'DEBUG',
    maxProgress: 2
  },
  {
    id: 'BOSS_SLAYER',
    name: 'Boss Slayer',
    description: 'Triomphe d’un Boss SQL multi-requêtes épique.',
    icon: 'Skull',
    category: 'BOSS',
    maxProgress: 1
  },
  {
    id: 'SUBQUERY_SAGE',
    name: 'Subquery Sage',
    description: 'Résous des requêtes imbriquées (Sous-requêtes WHERE / IN / ALL).',
    icon: 'Binary',
    category: 'SUBQUERY',
    maxProgress: 2
  },
  {
    id: 'SANDBOX_EXPLORER',
    name: 'Explorateur Sandbox',
    description: 'Exécute 10 requêtes personnalisées dans le bac à sable.',
    icon: 'Terminal',
    category: 'SANDBOX',
    maxProgress: 10
  },
  {
    id: 'DATABASE_LEGEND',
    name: 'Database Legend',
    description: 'Atteins le Niveau 10 et débloque au moins 15 défis.',
    icon: 'Trophy',
    category: 'GLOBAL',
    maxProgress: 15
  }
];

export class BadgeManager {
  static checkBadges(profile: PlayerProfile): { newlyUnlocked: Badge[]; updatedBadges: PlayerProfile['badges'] } {
    const updated = { ...profile.badges };
    const newlyUnlocked: Badge[] = [];

    const completed = profile.completedChallenges;
    const history = profile.queryHistory;

    ALL_BADGES.forEach(badge => {
      const current = updated[badge.id] || { unlocked: false, progress: 0 };
      if (current.unlocked) return;

      let progress = 0;

      switch (badge.id) {
        case 'SELECT_ROOKIE':
          progress = completed.filter(id => id.startsWith('SEL_')).length;
          break;
        case 'WHERE_WARRIOR':
          progress = completed.filter(id => id.startsWith('WHE_')).length;
          break;
        case 'JOIN_HUNTER':
          progress = completed.filter(id => id.startsWith('JOIN_')).length;
          break;
        case 'AGGREGATE_ACE':
          progress = completed.filter(id => id.startsWith('AGG_')).length;
          break;
        case 'GROUP_GURU':
          progress = completed.filter(id => id.startsWith('GRP_')).length;
          break;
        case 'QUERY_STREAK_3':
          progress = Math.min(badge.maxProgress, profile.bestStreak);
          break;
        case 'SPEED_CODER':
          progress = completed.filter(id => id.startsWith('TIME_')).length > 0 ? 1 : 0;
          break;
        case 'BUG_HUNTER':
          progress = completed.filter(id => id.startsWith('ERR_')).length;
          break;
        case 'BOSS_SLAYER':
          progress = completed.filter(id => id.startsWith('BOSS_')).length;
          break;
        case 'SUBQUERY_SAGE':
          progress = completed.filter(id => id.startsWith('SUB_')).length;
          break;
        case 'SANDBOX_EXPLORER':
          progress = Math.min(badge.maxProgress, history.length);
          break;
        case 'DATABASE_LEGEND':
          progress = Math.min(badge.maxProgress, completed.length);
          break;
        default:
          progress = 0;
      }

      const isNowUnlocked = progress >= badge.maxProgress;
      updated[badge.id] = {
        unlocked: isNowUnlocked,
        progress: Math.min(progress, badge.maxProgress),
        unlockedAt: isNowUnlocked ? (current.unlockedAt || new Date().toISOString()) : undefined
      };

      if (isNowUnlocked && !current.unlocked) {
        newlyUnlocked.push(badge);
      }
    });

    return { newlyUnlocked, updatedBadges: updated };
  }
}
