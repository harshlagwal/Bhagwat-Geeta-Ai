import React from 'react';
import { Progress } from '../types';
import { XIcon, CalendarDaysIcon, HelpCircleIcon, BookOpenIcon, BookmarkIcon } from './ui';

interface ProgressDashboardProps {
  progress: Progress | null;
  onClose: () => void;
  userName: string;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number }> = ({ icon, title, value }) => (
  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50 flex flex-col items-center justify-center text-center">
    <div className="text-orange-600 mb-2">{icon}</div>
    <p className="text-3xl font-bold text-orange-900">{value}</p>
    <p className="text-sm text-orange-800 font-medium">{title}</p>
  </div>
);

const ChapterGrid: React.FC<{ exploredChapters: number[] }> = ({ exploredChapters }) => {
  const chapters = Array.from({ length: 18 }, (_, i) => i + 1);
  const exploredSet = new Set(exploredChapters);

  return (
    <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 p-4 bg-white/50 rounded-lg border border-white/50 shadow-inner">
      {chapters.map((chapter) => (
        <div
          key={chapter}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300
            ${exploredSet.has(chapter)
              ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md'
              : 'bg-orange-100/70 text-orange-700'
            }`}
          title={`Chapter ${chapter}${exploredSet.has(chapter) ? ' (Explored)' : ''}`}
        >
          {chapter}
        </div>
      ))}
    </div>
  );
};

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress, onClose, userName }) => {
  if (!progress) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-slide-up" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 p-6 rounded-3xl shadow-2xl border border-white/50"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white transition-colors"
          aria-label="Close dashboard"
        >
          <XIcon className="w-5 h-5 text-orange-900" />
        </button>

        <h2 className="text-center font-laila text-2xl md:text-3xl font-bold text-orange-900 mb-1">
          {userName}'s Spiritual Journey
        </h2>
        <p className="text-center text-orange-800/90 mb-6">आपकी आध्यात्मिक यात्रा</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<CalendarDaysIcon className="w-8 h-8" />} title="Days Active" value={progress.daysActive} />
          <StatCard icon={<HelpCircleIcon className="w-8 h-8" />} title="Questions Asked" value={progress.questionsAsked} />
          <StatCard icon={<BookmarkIcon className="w-8 h-8" />} title="Verses Saved" value={progress.versesSaved} />
        </div>

        <div>
          <h3 className="font-laila text-xl font-bold text-orange-900 mb-3 text-center">Chapters Explored</h3>
          <ChapterGrid exploredChapters={progress.exploredChapters} />
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;