
export type Message = {
  role: 'user' | 'model';
  content: string;
};

export type User = {
  name: string;
};

export type Progress = {
  daysActive: number;
  questionsAsked: number;
  versesSaved: number;
  lastActiveDate: string; // YYYY-MM-DD
  exploredChapters: number[];
};
