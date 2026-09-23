import { GoogleGenAI, Type } from "@google/genai";
import { QuizResult } from "../types";
import { QUIZ_QUESTIONS } from "../constants";

export const generatePersonalityResult = async (answers: Record<number, string>): Promise<QuizResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userChoices = Object.entries(answers).map(([qid, aid]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === Number(qid));
    const option = question?.options.find(o => o.id === aid);
    return `Q: ${question?.text} A: ${option?.text} (Signal: ${option?.trait})`;
  }).join('\n');

  const prompt = `You are a warm, funny observer who sees how the world we grew up in shaped our instincts today. 
  Based on the quiz results below, put the user into ONE of these six "Infrastructures." 
  
  CRITICAL INSTRUCTIONS:
  - Use super simple, fun, and quirky language. No big words!
  - Frame the result as: "Because you lived in [this kind of system], you developed [this superpower]."
  - The tone should be like a friend telling a cool story.
  - KEEP THE DESCRIPTION SHORT (max 3 sentences) so it fits on a mobile screen without scrolling.

  THE CATEGORIES & THEIR VIBE TYPES:
  1. Adaptive Navigator (Type: DYNAMICS): "The Human Shortcut." You flow like water. Growing up where plans changed every minute made you a pro at finding a way through.
  2. Community Compiler (Type: NETWORKS): "The Social Safety Net." You know people are better than processes. Your environment taught you that a good neighbor is better than a formal rule.
  3. Hustle Architect (Type: LOGICS): "The Gap-Finder." You've got eagle eyes. Growing up in busy, competitive spaces taught you exactly when to jump and how to spot a win.
  4. Rule Bender (Type: SHORTCUTS): "The Loophole Legend." You see rules as "vague suggestions." You learned early how to wiggle through the system with a smile to get things done.
  5. Order Seeker (Type: STABILITY): "The Logic Legend." You love a good plan. Growing up in a bit of a mess made you the superhero of structure and calm.
  6. Emotional Regulator (Type: HARMONY): "The Vibes-Expert." You have social radar. Growing up where you had to read the room taught you how to keep everyone happy before a word is even said.

  Return a JSON object with:
  - personalityType: The name of the dominant system above (one of the 6 names).
  - description: 2-3 very short, fun sentences explaining how their world shaped them.
  - traits: 3 simple, fun adjectives (e.g., "Bouncy," "Sharp," "Kind").
  - systemMetaphor: A short, quirky 2-3 word metaphor.

  USER PROFILE SIGNALS:
  ${userChoices}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          personalityType: { type: Type.STRING },
          description: { type: Type.STRING },
          traits: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          systemMetaphor: { type: Type.STRING }
        },
        required: ['personalityType', 'description', 'traits', 'systemMetaphor'],
        propertyOrdering: ['personalityType', 'description', 'traits', 'systemMetaphor']
      }
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      personalityType: "Adaptive Navigator",
      description: "You're a master of the pivot! Growing up in a world where things never went to plan turned you into a quick-thinker who always finds the fastest way home.",
      traits: ["Quick", "Smart", "Flexy"],
      systemMetaphor: "The Human Shortcut"
    };
  }
};