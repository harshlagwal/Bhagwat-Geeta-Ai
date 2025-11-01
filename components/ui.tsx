import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'model';
  content: string;
  // FIX: Corrected the function type syntax.
  onSave?: () => void;
  className?: string;
}

export const GitaIcon: React.FC<{className?: string}> = ({ className }) => (
  <div className={`text-orange-900 ${className}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 3a9 9 0 0 0 9 9"/>
    </svg>
  </div>
);

export const BookmarkIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
);


export const MessageBubble: React.FC<MessageBubbleProps> = ({ role, content, onSave, className }) => {
  const isModel = role === 'model';
  const bubbleClasses = isModel
    ? 'bg-[#FFFDF9] border border-amber-200/80 rounded-2xl rounded-tl-sm'
    : 'bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl rounded-br-sm';

  return (
    <div className={`flex items-start gap-3 w-full ${isModel ? 'justify-start' : 'justify-end'} ${className}`}>
      {isModel && (
         <img 
          src="https://i.postimg.cc/XvSXgjrJ/god-8674031.jpg" 
          alt="Gita Guide AI" 
          className="w-11 h-11 rounded-full flex-shrink-0 shadow-md border-2 border-white"
        />
      )}
      <div className={`p-5 shadow-lg ${bubbleClasses} max-w-2xl relative group`}>
        <p className="whitespace-pre-wrap font-laila leading-relaxed" style={{color: isModel ? '#3a1a00' : 'white'}}>{content}</p>
        {isModel && onSave && (
          <button 
            onClick={onSave} 
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100" 
            aria-label="Save verse"
            title="Save verse"
          >
            <BookmarkIcon className="w-5 h-5 text-orange-800" />
          </button>
        )}
      </div>
      {!isModel && (
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md border-2 border-white">
          <GitaIcon className="w-7 h-7 text-white"/>
        </div>
      )}
    </div>
  );
};


export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-start items-center gap-3 animate-fade-in-slide-up">
     <img 
        src="https://i.postimg.cc/XvSXgjrJ/god-8674031.jpg" 
        alt="Gita Guide AI is thinking" 
        className="w-11 h-11 rounded-full flex-shrink-0 shadow-md border-2 border-white"
     />
    <div className="p-4 bg-[#FFFDF9] border border-amber-200/80 rounded-2xl rounded-tl-sm shadow-lg flex items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

export const SendIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export const ChartBarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18"/><path d="M7 12v6"/><path d="M12 6v12"/><path d="M17 14v4"/>
    </svg>
);

export const XIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
);

export const CalendarDaysIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
    </svg>
);

export const HelpCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
    </svg>
);

export const BookOpenIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/>
    </svg>
);