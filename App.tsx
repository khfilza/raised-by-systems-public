import React, { useState } from 'react';
import Home from './components/Home';
import CategoriesOverview from './components/CategoriesOverview';
import SystemMap from './components/SystemMap';
import Quiz from './components/Quiz';
import LoadingScreen from './components/LoadingScreen';
import Result from './components/Result';
import { AppState, QuizResult } from './types';
import { QUIZ_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.HOME);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  const startQuiz = () => setCurrentStep(AppState.CATEGORIES);
  const goToSystemMap = () => setCurrentStep(AppState.SYSTEM_MAP);
  const proceedToQuiz = () => setCurrentStep(AppState.QUIZ);

  const handleBack = () => {
    switch (currentStep) {
      case AppState.CATEGORIES:
        setCurrentStep(AppState.HOME);
        break;
      case AppState.SYSTEM_MAP:
        setCurrentStep(AppState.CATEGORIES);
        break;
      case AppState.QUIZ:
        setCurrentStep(AppState.SYSTEM_MAP);
        break;
      default:
        break;
    }
  };

  // Instant local result calculation based on balanced trait counting
  const calculateResult = (answers: Record<number, string>): QuizResult => {
    const traitCounts: Record<string, number> = {
      navigator: 0,
      community: 0,
      hustle: 0,
      bender: 0,
      seeker: 0,
      regulator: 0
    };
    
    Object.entries(answers).forEach(([qid, aid]) => {
      const question = QUIZ_QUESTIONS.find(q => q.id === Number(qid));
      const option = question?.options.find(o => o.id === aid);
      if (option?.trait) {
        traitCounts[option.trait] = (traitCounts[option.trait] || 0) + 1;
      }
    });

    const sortedTraits = Object.entries(traitCounts).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      const priority = ['bender', 'hustle', 'navigator', 'community', 'regulator', 'seeker'];
      return priority.indexOf(a[0]) - priority.indexOf(b[0]);
    });

    const primaryTrait = sortedTraits[0][0];
    const secondaryTrait = sortedTraits[1][0];

    const traitKeywords: Record<string, string[]> = {
      navigator: ["Agile", "Fluid", "Spontaneous"],
      community: ["Loyal", "Shared", "Linked"],
      hustle: ["Value-Driven", "Strategic", "Sharp"],
      bender: ["Unconventional", "Resourceful", "Bold"],
      seeker: ["Organized", "Logical", "Measured"],
      regulator: ["Balanced", "Peaceful", "Aware"]
    };

    const combinedTraits = [
      ...traitKeywords[primaryTrait].slice(0, 2),
      traitKeywords[secondaryTrait][0]
    ];

    const resultsMap: Record<string, QuizResult> = {
      navigator: {
        personalityType: "Adaptive Navigator",
        description: "You're a master of the pivot. Growing up in a world where things rarely went to plan turned you into a quick-thinker who always finds the fastest way home.",
        traits: combinedTraits,
        systemMetaphor: "The Human Shortcut"
      },
      community: {
        personalityType: "Community Compiler",
        description: "You know that people are the ultimate infrastructure. You've learned that a trusted neighbor or a known face is more reliable than any formal rule.",
        traits: combinedTraits,
        systemMetaphor: "The Social Safety Net"
      },
      hustle: {
        personalityType: "Hustle Architect",
        description: "You see the gaps others miss. Competitive or high-pressure environments taught you exactly when to jump and how to build value from thin air.",
        traits: combinedTraits,
        systemMetaphor: "The Gap-Finder"
      },
      bender: {
        personalityType: "Rule Bender",
        description: "You treat 'rules' as suggestions. You learned early how to wiggle through rigid systems with a smile, finding the flexibility where others see walls.",
        traits: combinedTraits,
        systemMetaphor: "The Loophole Legend"
      },
      seeker: {
        personalityType: "Order Seeker",
        description: "You are the superhero of structure. Growing up in a bit of a mess made you the person who brings calm, logic, and a solid plan to every room.",
        traits: combinedTraits,
        systemMetaphor: "The Logic Legend"
      },
      regulator: {
        personalityType: "Emotional Regulator",
        description: "You have social radar. You learned to read the room before a word was spoken, becoming an expert at keeping the peace and balancing the vibes.",
        traits: combinedTraits,
        systemMetaphor: "The Vibes-Expert"
      }
    };

    return resultsMap[primaryTrait] || resultsMap['navigator'];
  };

  const handleQuizComplete = (finalAnswers: Record<number, string>) => {
    setQuizAnswers(finalAnswers);
    setCurrentStep(AppState.LOADING);
    const computedResult = calculateResult(finalAnswers);
    setResult(computedResult);

    setTimeout(() => {
      setCurrentStep(AppState.RESULT);
    }, 1800);
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setQuizAnswers({});
    setCurrentStep(AppState.HOME);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-0 sm:p-4 w-full">
      <div className="w-full max-w-md bg-white sm:rounded-[2.5rem] shadow-2xl overflow-hidden h-screen sm:h-[720px] flex flex-col relative border-0 sm:border border-gray-100">
        {currentStep === AppState.HOME && <Home onStart={startQuiz} error={error} />}
        {currentStep === AppState.CATEGORIES && <CategoriesOverview onContinue={goToSystemMap} onBack={handleBack} />}
        {currentStep === AppState.SYSTEM_MAP && <SystemMap onContinue={proceedToQuiz} onBack={handleBack} />}
        {currentStep === AppState.QUIZ && <Quiz onComplete={handleQuizComplete} onBack={handleBack} initialAnswers={quizAnswers} />}
        {currentStep === AppState.LOADING && <LoadingScreen />}
        {currentStep === AppState.RESULT && result && <Result result={result} onReset={reset} />}
      </div>
      
      <div className="hidden sm:block mt-6 text-center opacity-30 select-none">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase deep-teal">Raised by Systems</p>
      </div>
    </div>
  );
};

export default App;