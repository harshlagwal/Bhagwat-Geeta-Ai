
import { GoogleGenAI } from "@google/genai";
import { Message, Progress } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getGitaGuidance = async (history: Message[], userName: string, progress: Progress): Promise<string> => {
  try {
    const progressString = `
- Days Active: ${progress.daysActive}
- Questions Asked: ${progress.questionsAsked}
- Verses Saved: ${progress.versesSaved}
- Chapters Explored: ${progress.exploredChapters?.length || 0}
    `;

    const personalizedSystemInstruction = SYSTEM_INSTRUCTION
      .replace(/\[User Name\]/g, userName)
      .replace(/\[Name\]/g, userName)
      .replace('{currentUserProgress}', progressString);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] })),
      config: {
        systemInstruction: personalizedSystemInstruction,
      },
    });

    const text = response.text;
    if (!text) {
      return "An error occurred while fetching the response. The response was empty.";
    }
    return text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return "An unknown error occurred while fetching guidance.";
  }
};
