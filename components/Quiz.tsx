import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS, COLORS } from '../constants';

interface QuizProps {
  onComplete: (answers: Record<number, string>) => void;
  onBack: () => void;
  initialAnswers: Record<number, string>;
}

const MotionDiv = motion.div as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;

const MovementBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <MotionPath 
        d="M-10,30 Q30,10 60,50 T120,30" 
        fill="none" stroke="#006D77" strokeWidth="2.5" strokeDasharray="4 4"
        animate={{ pathOffset: [0, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <MotionPath 
        d="M-10,80 Q40,60 90,90 T120,70" 
        fill="none" stroke="#E76F51" strokeWidth="2.5" strokeDasharray="2 6"
        animate={{ pathOffset: [0, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </svg>
  </div>
);

const EconomyBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <MotionPath 
        d="M40,100 Q45,80 40,60 T40,20" 
        fill="none" stroke="#E9C46A" strokeWidth="3"
        animate={{ d: ["M40,100 Q45,80 40,60 T40,20", "M45,100 Q40,80 45,60 T45,20", "M40,100 Q45,80 40,60 T40,20"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <MotionCircle cx="20" cy="40" r="10" fill="#006D77" animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
      <MotionCircle cx="80" cy="70" r="12" fill="#E76F51" animate={{ scale: [1.1, 0.9, 1.1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
    </svg>
  </div>
);

const RulesBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {[25, 50, 75].map((y) => (
        <MotionPath 
          key={y}
          d={`M0,${y} L100,${y}`} 
          stroke="#2D3748" strokeWidth="1.5"
          animate={{ d: [`M0,${y} L100,${y}`, `M0,${y} Q50,${y - 10} 100,${y}`, `M0,${y} Q50,${y + 10} 100,${y}`, `M0,${y} L100,${y}`] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: y / 50 }}
        />
      ))}
    </svg>
  </div>
);

const SocialBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <MotionCircle cx="30" cy="30" r="6" fill="#CDB4DB" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <MotionCircle cx="70" cy="45" r="9" fill="#E9C46A" animate={{ scale: [1, 0.8, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <line x1="30" y1="30" x2="70" y2="45" stroke="#CDB4DB" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  </div>
);

const EmotionalBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <MotionCircle 
        cx="50" cy="50" r="30" 
        fill="none" stroke="#CDB4DB" strokeWidth="1.5"
        animate={{ r: [30, 60], opacity: [0.6, 0], strokeWidth: [1.5, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  </div>
);

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack, initialAnswers }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>(initialAnswers);

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[currentIdx].id]: optionId };
    setAnswers(newAnswers);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleInternalBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      onBack();
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  
  const getCategoryTheme = () => {
    if (currentIdx < 3) return { bg: <MovementBackground />, color: COLORS.deepTeal };
    if (currentIdx < 6) return { bg: <EconomyBackground />, color: COLORS.mustard };
    if (currentIdx < 9) return { bg: <RulesBackground />, color: COLORS.coral };
    if (currentIdx < 12) return { bg: <SocialBackground />, color: COLORS.deepTeal };
    return { bg: <EmotionalBackground />, color: COLORS.coral };
  };

  const theme = getCategoryTheme();

  return (
    <div className="flex-1 flex flex-col items-center h-full w-full relative overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <MotionDiv
          key={`bg-${currentIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {theme.bg}
        </MotionDiv>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <MotionDiv
          key={currentIdx}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 flex flex-col w-full relative z-10 px-8 items-center pt-16"
        >
          <div className="min-h-[100px] flex items-center justify-center mb-8 w-full text-center">
            <h2 className="text-xl md:text-2xl font-bold leading-tight text-charcoal balanced-text">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3.5 w-full max-w-[340px]">
            {currentQuestion.options.map((option) => (
              <MotionDiv
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <button
                  onClick={() => handleSelect(option.id)}
                  style={{ 
                    background: `linear-gradient(135deg, white, ${theme.color}0D)`,
                    borderColor: `${theme.color}20`
                  }}
                  className="w-full flex items-center justify-center text-center px-6 py-4 min-h-[82px] rounded-[1.6rem] border shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
                >
                  <span className="relative z-10 font-bold text-gray-700 text-[13px] sm:text-sm leading-snug group-hover:text-deep-teal balanced-text">
                    {option.text}
                  </span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{ backgroundColor: theme.color }}
                  />
                </button>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </AnimatePresence>

      <div className="mt-auto mb-4 w-full px-8 relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-between w-full pt-6 border-t border-gray-50">
          <div className="flex gap-2 py-2 overflow-hidden flex-1">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  i === currentIdx ? 'flex-[2] bg-deep-teal' : 
                  i < currentIdx ? 'flex-1 bg-mustard opacity-60' : 'flex-1 bg-gray-100'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-gray-400 tracking-wider ml-4 tabular-nums">
            {currentIdx + 1}/{QUIZ_QUESTIONS.length}
          </span>
        </div>
        
        <button 
          onClick={handleInternalBack}
          className="mt-4 mb-4 text-gray-400 hover:text-deep-teal transition-colors flex items-center gap-1.5 py-1"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
        </button>
      </div>
    </div>
  );
};

export default Quiz;