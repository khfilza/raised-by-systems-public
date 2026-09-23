import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QuizResult } from '../types';
import html2canvas from 'html2canvas';

interface ResultProps { result: QuizResult; onReset: () => void; }

const MotionDiv = motion.div as any;
const MotionPath = motion.path as any;
const MotionCircle = motion.circle as any;
const MotionRect = motion.rect as any;

const SystemIcon: React.FC<{ type: string }> = ({ type }) => {
  const normalizedType = type.toLowerCase();
  if (normalizedType.includes('navigator')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="deep-teal">
        <MotionPath d="M20,50 Q35,20 50,50 T80,50" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" animate={{ d: ["M20,50 Q35,20 50,50 T80,50", "M20,50 Q45,80 50,50 T80,50", "M20,50 Q35,20 50,50 T80,50"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <MotionCircle cx="50" cy="50" r="6" fill="currentColor" animate={{ x: [-25, 25, -25], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      </svg>
    );
  }
  if (normalizedType.includes('compiler')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="coral">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <MotionCircle key={i} cx={50} cy={50} r="6" fill="currentColor" animate={{ x: [0, 28 * Math.cos(angle * Math.PI / 180), 0], y: [0, 28 * Math.sin(angle * Math.PI / 180), 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }} />
        ))}
        <MotionCircle cx="50" cy="50" r="10" fill="currentColor" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </svg>
    );
  }
  if (normalizedType.includes('architect')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="mustard">
        <MotionRect x="30" y="65" width="40" height="14" rx="4" fill="currentColor" animate={{ y: [65, 60, 65], scaleX: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <MotionRect x="35" y="45" width="30" height="14" rx="4" fill="currentColor" animate={{ y: [45, 40, 45], x: [35, 38, 35] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
        <MotionRect x="42" y="25" width="16" height="14" rx="4" fill="currentColor" animate={{ y: [25, 20, 25], rotate: [0, 15, -15, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }} />
      </svg>
    );
  }
  if (normalizedType.includes('bender')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="lilac">
        <MotionPath d="M15,50 L85,50" stroke="currentColor" strokeWidth="12" strokeLinecap="round" animate={{ d: ["M15,50 L85,50", "M15,50 Q50,15 85,50", "M15,50 Q50,85 85,50", "M15,50 L85,50"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <MotionCircle cx="50" cy="50" r="6" fill="white" animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
      </svg>
    );
  }
  if (normalizedType.includes('seeker')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="deep-teal">
        <MotionRect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="5" fill="none" rx="6" animate={{ rotate: [0, 180], rx: [6, 20, 6] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
        <MotionCircle cx="50" cy="30" r="6" fill="currentColor" animate={{ cy: [30, 70, 30] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
    );
  }
  if (normalizedType.includes('regulator')) {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100" className="coral">
        <MotionCircle cx="50" cy="50" r="15" fill="currentColor" animate={{ scale: [1, 2.8, 1], opacity: [0.9, 0.1, 0.9] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <MotionCircle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3" animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <MotionCircle cx="50" cy="50" r="8" fill="currentColor" />
      </svg>
    );
  }
  return null;
};

const Result: React.FC<ResultProps> = ({ result, onReset }) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const categoryStyles = useMemo(() => {
    const type = result.personalityType.toLowerCase();
    if (type.includes('navigator')) return { bg: 'bg-teal-100/40', accent: 'deep-teal', mood: 'DYNAMICS' };
    if (type.includes('compiler')) return { bg: 'bg-orange-100/40', accent: 'coral', mood: 'NETWORKS' };
    if (type.includes('architect')) return { bg: 'bg-yellow-100/40', accent: 'mustard', mood: 'LOGICS' };
    if (type.includes('bender')) return { bg: 'bg-purple-100/40', accent: 'lilac', mood: 'SHORTCUTS' };
    if (type.includes('seeker')) return { bg: 'bg-blue-100/40', accent: 'deep-teal', mood: 'STABILITY' };
    return { bg: 'bg-red-100/40', accent: 'coral', mood: 'HARMONY' };
  }, [result]);

  const handleShare = async () => {
    const shareData = {
      title: 'Raised by Systems',
      text: `I'm a ${result.personalityType}! Metaphor: ${result.systemMetaphor}. See what shaped your instincts:`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share error', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Share link copied to clipboard!');
      } catch (err) {
        alert('Share not supported on this device.');
      }
    }
  };

  const handleDownload = async () => {
    if (!resultRef.current || isDownloading) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#FFFFFF',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `RaisedBySystems_${result.personalityType.replace(/\s+/g, '_')}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } else {
          throw new Error("Blob creation failed");
        }
      }, 'image/png');

    } catch (err) {
      console.error("Screenshot capture failed:", err);
      alert("Failed to capture image. Please try a manual screenshot!");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div ref={resultRef} className={`flex-1 flex flex-col p-6 overflow-hidden transition-colors duration-1000 ${categoryStyles.bg} h-full w-full items-center`}>
      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 flex flex-col items-center w-full overflow-y-auto no-scrollbar"
      >
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-md text-gray-500 text-[9px] font-bold tracking-[0.1em] mb-4 shadow-sm border border-white/50"
        >
          Your Results
        </MotionDiv>

        <div className="flex justify-center mb-4 scale-90">
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="p-5 bg-white rounded-[2rem] shadow-lg"
          >
            <SystemIcon type={result.personalityType} />
          </MotionDiv>
        </div>

        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mb-3">
          <h2 className="text-xl font-black mb-0.5 deep-teal leading-tight tracking-tight px-4 balanced-text">
            {result.personalityType}
          </h2>
          <p className="text-[9px] font-bold mustard tracking-[0.15em] uppercase">
            {result.systemMetaphor}
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-5 bg-white/95 backdrop-blur-md rounded-[1.8rem] text-center border border-white/60 mb-5 shadow-lg relative overflow-hidden w-full max-w-[300px]"
        >
          <MotionDiv 
            animate={{ scaleX: [0, 1] }}
            className="absolute top-0 left-0 w-full h-1 bg-mustard origin-left opacity-30"
          />
          
          <p className="text-[13px] text-gray-700 leading-relaxed mb-4 font-medium px-2 balanced-text">
            {result.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 justify-center">
            {result.traits.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-bold tracking-wide deep-teal border border-white">
                {trait}
              </span>
            ))}
          </div>
        </MotionDiv>

        <p className="text-[10px] text-gray-400 font-bold tracking-[0.1em] mb-4 uppercase opacity-70">
          Vibe — {categoryStyles.mood}
        </p>

        <MotionDiv whileTap={{ scale: 0.98 }} className="w-full max-w-[260px] mb-4">
          <button
            onClick={onReset}
            className="w-full py-4 bg-deep-teal text-white rounded-full font-bold text-xs tracking-widest shadow-lg shadow-teal-900/10"
          >
            RESTART
          </button>
        </MotionDiv>
      </MotionDiv>

      <div className="mt-auto w-full pt-4 flex gap-8 justify-center items-center border-t border-gray-100/50">
        <MotionDiv whileTap={{ scale: 0.9 }}>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex flex-col items-center gap-1.5 group disabled:opacity-50"
          >
            <div className="p-3 bg-white/80 rounded-full shadow-sm text-deep-teal group-hover:bg-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest deep-teal opacity-60">
              {isDownloading ? '...' : 'Save'}
            </span>
          </button>
        </MotionDiv>
        <MotionDiv whileTap={{ scale: 0.9 }}>
          <button 
            onClick={handleShare}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="p-3 bg-white/80 rounded-full shadow-sm text-deep-teal group-hover:bg-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest deep-teal opacity-60">Share</span>
          </button>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Result;