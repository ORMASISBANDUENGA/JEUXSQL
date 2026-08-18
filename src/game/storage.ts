import { PlayerProfile, Badge } from '../types';
import { getRankForLevel, getXpRequiredForLevel } from './ranks';
import { BadgeManager } from './badges';

const STORAGE_KEY = 'sql_quest_player_profile_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  id: 'player_hero',
  username: 'Chevalier SQL',
  avatar: '🛡️',
  level: 1,
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  lives: 5,
  maxLives: 5,
  totalPoints: 0,
  completedChallenges: [],
  badges: {},
  soundEnabled: true,
  theme: 'dark',
  themeMode: 'dark',
  language: 'fr',
  queryHistory: []
};

export class StorageService {
  public static loadProfile(): PlayerProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check day streak rollover
        const today = new Date().toISOString().split('T')[0];
        const lastDate = parsed.lastActiveDate || today;
        
        // Ensure all properties exist
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          badges: parsed.badges || {},
          completedChallenges: parsed.completedChallenges || [],
          queryHistory: parsed.queryHistory || []
        };
      }
    } catch (e) {
      console.error('Erreur chargement profil:', e);
    }
    return { ...DEFAULT_PROFILE };
  }

  public static saveProfile(profile: PlayerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Erreur sauvegarde profil:', e);
    }
  }

  public static addXpAndPoints(
    currentProfile: PlayerProfile,
    xpGained: number,
    pointsGained: number,
    challengeId?: string
  ): {
    updatedProfile: PlayerProfile;
    leveledUp: boolean;
    oldLevel: number;
    newLevel: number;
    newlyUnlockedBadges: Badge[];
  } {
    let newXp = currentProfile.xp + xpGained;
    let newLevel = currentProfile.level;
    let leveledUp = false;
    const oldLevel = currentProfile.level;

    // Check level ups
    while (newXp >= getXpRequiredForLevel(newLevel)) {
      newXp -= getXpRequiredForLevel(newLevel);
      newLevel += 1;
      leveledUp = true;
    }

    const today = new Date().toISOString().split('T')[0];
    const newStreak = currentProfile.streak + 1;
    const newBestStreak = Math.max(currentProfile.bestStreak, newStreak);

    const completed = challengeId
      ? Array.from(new Set([...currentProfile.completedChallenges, challengeId]))
      : currentProfile.completedChallenges;

    const intermediateProfile: PlayerProfile = {
      ...currentProfile,
      xp: newXp,
      level: newLevel,
      totalPoints: currentProfile.totalPoints + pointsGained,
      streak: newStreak,
      bestStreak: newBestStreak,
      lastActiveDate: today,
      completedChallenges: completed,
      // Refill 1 heart on success if not max
      lives: Math.min(currentProfile.maxLives, currentProfile.lives + 1)
    };

    // Check Badges
    const { newlyUnlocked, updatedBadges } = BadgeManager.checkBadges(intermediateProfile);
    const updatedProfile: PlayerProfile = {
      ...intermediateProfile,
      badges: updatedBadges
    };

    this.saveProfile(updatedProfile);

    return {
      updatedProfile,
      leveledUp,
      oldLevel,
      newLevel,
      newlyUnlockedBadges: newlyUnlocked
    };
  }

  public static loseLife(profile: PlayerProfile): PlayerProfile {
    const updated: PlayerProfile = {
      ...profile,
      lives: Math.max(0, profile.lives - 1),
      streak: 0 // Reset current streak on failure
    };
    this.saveProfile(updated);
    return updated;
  }

  public static refillLives(profile: PlayerProfile): PlayerProfile {
    const updated: PlayerProfile = {
      ...profile,
      lives: profile.maxLives
    };
    this.saveProfile(updated);
    return updated;
  }

  public static recordQueryHistory(
    profile: PlayerProfile,
    query: string,
    success: boolean,
    databaseId: string
  ): PlayerProfile {
    const historyItem = {
      query,
      timestamp: new Date().toLocaleTimeString(),
      success,
      databaseId
    };

    const newHistory = [historyItem, ...(profile.queryHistory || [])].slice(0, 50);
    const updated: PlayerProfile = {
      ...profile,
      queryHistory: newHistory
    };

    const { updatedBadges } = BadgeManager.checkBadges(updated);
    updated.badges = updatedBadges;

    this.saveProfile(updated);
    return updated;
  }

  public static resetProgress(): PlayerProfile {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = { ...DEFAULT_PROFILE };
    this.saveProfile(fresh);
    return fresh;
  }
}
