export enum AppTab {
  MEDITATE = 'MEDITATE',
  HISTORY = 'HISTORY',
  QUOTES = 'QUOTES',
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
  isGenerated?: boolean;
}

export interface CheckIn {
  id: string;
  timestamp: number; // Unix timestamp
  dateString: string; // YYYY-MM-DD for easy grouping
  durationSeconds: number;
}

export interface UserStats {
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
}

export interface AuthorOption {
  id: string;
  name: string;
  style: string;
}