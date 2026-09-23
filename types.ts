
export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    trait: string;
  }[];
}

export interface QuizResult {
  personalityType: string;
  description: string;
  traits: string[];
  systemMetaphor: string;
}

export enum AppState {
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  SYSTEM_MAP = 'SYSTEM_MAP',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  RESULT = 'RESULT'
}
