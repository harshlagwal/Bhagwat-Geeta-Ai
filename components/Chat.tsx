import React, { useState, useRef, useEffect } from 'react';
import { Message, User, Progress } from '../types';
import { GREETING_MESSAGE_TEMPLATE } from '../constants';
import { getGitaGuidance } from '../services/geminiService';
import { MessageBubble, LoadingSpinner, SendIcon, ChartBarIcon } from './ui';
import ProgressDashboard from './ProgressDashboard';

interface ChatProps {
    user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
    const getPersonalizedGreeting = (): Message => {
        const content = GREETING_MESSAGE_TEMPLATE.replace('[User Name]', user.name);
        return { role: 'model', content };
    };

    const [messages, setMessages] = useState<Message[]>([getPersonalizedGreeting()]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [isDashboardVisible, setIsDashboardVisible] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Effect to load and manage progress from localStorage
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const progressKey = `gita-progress-${user.name}`;
        
        try {
            const savedProgressRaw = localStorage.getItem(progressKey);
            if (savedProgressRaw) {
                const savedProgress: Progress = JSON.parse(savedProgressRaw);
                
                // Backwards compatibility for old progress objects
                if (!savedProgress.exploredChapters) {
                    savedProgress.exploredChapters = [];
                }

                // Check if it's a new day of activity
                if (savedProgress.lastActiveDate !== today) {
                    savedProgress.daysActive += 1;
                    savedProgress.lastActiveDate = today;
                    localStorage.setItem(progressKey, JSON.stringify(savedProgress));
                }
                setProgress(savedProgress);
            } else {
                // Initialize for a new user
                const initialProgress: Progress = {
                    daysActive: 1,
                    questionsAsked: 0,
                    versesSaved: 0,
                    lastActiveDate: today,
                    exploredChapters: [],
                };
                localStorage.setItem(progressKey, JSON.stringify(initialProgress));
                setProgress(initialProgress);
            }
        } catch (error) {
            console.error("Failed to manage progress in localStorage:", error);
            // Fallback to a temporary state if localStorage fails
            setProgress({
                daysActive: 1,
                questionsAsked: 0,
                versesSaved: 0,
                lastActiveDate: today,
                exploredChapters: [],
            });
        }
    }, [user.name]);

    const updateProgress = (updates: Partial<Progress>) => {
        setProgress(prev => {
            if (!prev) return null;
            const newProgress = { ...prev, ...updates };
            try {
                localStorage.setItem(`gita-progress-${user.name}`, JSON.stringify(newProgress));
            } catch (error) {
                console.error("Failed to save progress:", error);
            }
            return newProgress;
        });
    };

    // Effect to parse new model messages for chapters
    useEffect(() => {
        if (messages.length < 2 || !progress) return; // Don't run on initial greeting

        const lastMessage = messages[messages.length - 1];

        if (lastMessage.role === 'model') {
            const chapterRegex = /(?:Chapter|अध्याय)\s+(\d+)/gi;
            const currentChapters = new Set<number>(progress.exploredChapters || []);
            let match;
            while ((match = chapterRegex.exec(lastMessage.content)) !== null) {
                const chapterNum = parseInt(match[1], 10);
                if (!isNaN(chapterNum) && chapterNum >= 1 && chapterNum <= 18) {
                    currentChapters.add(chapterNum);
                }
            }

            if (currentChapters.size > (progress.exploredChapters?.length || 0)) {
                updateProgress({ exploredChapters: Array.from(currentChapters).sort((a, b) => a - b) });
            }
        }
    }, [messages, progress]);


    const handleSaveVerse = () => {
        updateProgress({ versesSaved: (progress?.versesSaved || 0) + 1 });
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading || !progress) return;

        const userMessage: Message = { role: 'user', content: userInput };
        const currentMessages = [...messages, userMessage];
        setMessages(currentMessages);
        setUserInput('');
        setIsLoading(true);

        const updatedProgressForApi = { ...progress, questionsAsked: progress.questionsAsked + 1 };
        updateProgress({ questionsAsked: updatedProgressForApi.questionsAsked });

        try {
            const botResponse = await getGitaGuidance(currentMessages, user.name, updatedProgressForApi);
            setMessages(prev => [...prev, { role: 'model', content: botResponse }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: 'क्षमा करें, मुझे उत्तर देने में कठिनाई हो रही है।' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isDashboardVisible && (
                <ProgressDashboard 
                    progress={progress} 
                    onClose={() => setIsDashboardVisible(false)} 
                    userName={user.name}
                />
            )}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-8">
                    {messages.map((msg, index) => (
                        <MessageBubble 
                            key={index} 
                            role={msg.role} 
                            content={msg.content}
                            className={index > 0 ? 'animate-fade-in-slide-up' : ''}
                            onSave={msg.role === 'model' && index > 0 ? () => handleSaveVerse() : undefined}
                        />
                    ))}
                    {isLoading && <LoadingSpinner />}
                    <div ref={chatEndRef} />
                </div>
            </main>

            <footer className="p-4 bg-transparent sticky bottom-0">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-3 bg-white/60 backdrop-blur-lg p-2 rounded-full shadow-lg border border-orange-200/50">
                    <button
                        type="button"
                        onClick={() => setIsDashboardVisible(true)}
                        className="p-3 w-12 h-12 flex items-center justify-center text-orange-700 hover:text-orange-900 hover:bg-orange-200/50 rounded-full transition-colors duration-300"
                        aria-label="View your progress journey"
                        title="View Journey"
                    >
                        <ChartBarIcon className="w-6 h-6" />
                    </button>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="अपना प्रश्न यहाँ पूछें..."
                        className="flex-1 p-3 bg-transparent focus:outline-none font-laila text-gray-700 placeholder:text-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="p-3 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full hover:scale-105 disabled:scale-100 disabled:bg-gradient-to-br disabled:from-orange-300 disabled:to-amber-300 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    >
                        <SendIcon />
                    </button>
                </form>
            </footer>
        </>
    );
};

export default Chat;