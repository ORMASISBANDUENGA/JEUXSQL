import { PlayerProfile, SQLCategory, Difficulty } from '../types';
import { CHALLENGES } from './challenges';

export interface CategoryMastery {
  category: SQLCategory;
  label: string;
  totalChallenges: number;
  completedChallenges: number;
  percentage: number;
  color: string;
}

export class StatsManager {
  static getMasteryStats(profile: PlayerProfile): CategoryMastery[] {
    const categories: { category: SQLCategory; label: string; color: string }[] = [
      { category: 'SELECT', label: 'SELECT & Projection', color: '#00D4FF' },
      { category: 'WHERE', label: 'WHERE & Filtres', color: '#6C63FF' },
      { category: 'ORDER_BY', label: 'ORDER BY & Tri', color: '#9C27B0' },
      { category: 'AGGREGATE', label: 'Fonctions d’Agrégation', color: '#FF9800' },
      { category: 'GROUP_BY', label: 'GROUP BY & Groupes', color: '#E91E63' },
      { category: 'HAVING', label: 'HAVING & Filtres Groupes', color: '#F44336' },
      { category: 'JOIN', label: 'JOINTURES (INNER / LEFT)', color: '#4CAF50' },
      { category: 'SUBQUERY', label: 'Sous-Requêtes Imbriquées', color: '#00BCD4' },
      { category: 'ADVANCED', label: 'Défis Boss & Avancés', color: '#FFD740' }
    ];

    return categories.map(cat => {
      const allInCat = CHALLENGES.filter(c => c.category === cat.category);
      const completedInCat = allInCat.filter(c => profile.completedChallenges.includes(c.id));
      const percentage = allInCat.length > 0 ? Math.round((completedInCat.length / allInCat.length) * 100) : 0;

      return {
        category: cat.category,
        label: cat.label,
        totalChallenges: allInCat.length,
        completedChallenges: completedInCat.length,
        percentage,
        color: cat.color
      };
    });
  }

  static getGlobalProgress(profile: PlayerProfile): {
    totalChallenges: number;
    completedCount: number;
    completionPercentage: number;
    totalPoints: number;
    accuracyRate: number;
  } {
    const totalChallenges = CHALLENGES.length;
    const completedCount = profile.completedChallenges.length;
    const completionPercentage = Math.round((completedCount / totalChallenges) * 100);

    const history = profile.queryHistory || [];
    const totalQueries = history.length;
    const successQueries = history.filter(h => h.success).length;
    const accuracyRate = totalQueries > 0 ? Math.round((successQueries / totalQueries) * 100) : 100;

    return {
      totalChallenges,
      completedCount,
      completionPercentage,
      totalPoints: profile.totalPoints,
      accuracyRate
    };
  }

  static getAdaptiveRecommendation(profile: PlayerProfile): {
    difficulty: Difficulty;
    recommendedCategory: SQLCategory;
    advice: string;
  } {
    const stats = this.getMasteryStats(profile);
    const avgMastery = stats.reduce((acc, curr) => acc + curr.percentage, 0) / stats.length;

    // Find category with lowest completion that still has unfinished challenges
    const unfinished = stats.filter(s => s.completedChallenges < s.totalChallenges);
    const targetCat = unfinished.length > 0 ? unfinished[0].category : 'ADVANCED';

    if (avgMastery >= 75) {
      return {
        difficulty: 'ADVANCED',
        recommendedCategory: targetCat,
        advice: 'Maîtrise remarquable ! Attaque les sous-requêtes complexes et les défis Boss pour forger ton titre de SQL Master.'
      };
    } else if (avgMastery >= 40) {
      return {
        difficulty: 'INTERMEDIATE',
        recommendedCategory: targetCat,
        advice: 'Bonne vitesse de croisière ! Perfectionne les GROUP BY, HAVING et jointures multi-tables.'
      };
    } else {
      return {
        difficulty: 'BEGINNER',
        recommendedCategory: targetCat,
        advice: 'Solidifie tes bases en pratiquant les projections SELECT, filtres WHERE et tris ORDER BY.'
      };
    }
  }
}
