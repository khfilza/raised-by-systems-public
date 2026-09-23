import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface CategoriesOverviewProps {
  onContinue: () => void;
  onBack: () => void;
}

const CATEGORIES = [
  { 
    id: 'navigator', 
    name: 'Adaptive Navigator', 
    color: '#006D77', 
    bgColor: '#E6F2F2',
    desc: 'Adjusts fast when plans change.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 12 7-9 7 9-7 9-7-9Z"/><path d="m14 11 3 3"/>
      </svg>
    )
  },
  { 
    id: 'compiler', 
    name: 'Community Compiler', 
    color: '#E76F51', 
    bgColor: '#FDF2F0',
    desc: 'Leans on people over processes.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  { 
    id: 'architect', 
    name: 'Hustle Architect', 
    color: '#E9C46A', 
    bgColor: '#FEF9E7',
    desc: 'Spots value where others don’t.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/>
      </svg>
    )
  },
  { 
    id: 'bender', 
    name: 'Rule Bender', 
    color: '#CDB4DB', 
    bgColor: '#F4EFF6',
    desc: 'Knows the system and its gaps.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m14 10-6 6"/><path d="m8 10 6 6"/>
      </svg>
    )
  },
  { 
    id: 'seeker', 
    name: 'Order Seeker', 
    color: '#006D77', 
    bgColor: '#E6F2F2',
    desc: 'Feels safest with structure.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="3"/><path d="m15 15 3 3"/><path d="m9 9 3 3"/>
      </svg>
    )
  },
  { 
    id: 'regulator', 
    name: 'Emotional Regulator', 
    color: '#E76F51', 
    bgColor: '#FDF2F0',
    desc: 'Reads the room before acting.',
    icon: (color: string) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    )
  }
];

const CategoryTile: React.FC<{ cat: typeof CATEGORIES[0] }> = ({ cat }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-32 cursor-pointer perspective-1000"
      onClick={() => setFlipped(!flipped)}
    >
      <MotionDiv
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", damping: 20, stiffness: 120 }}
      >
        <div 
          className="absolute inset-0 backface-hidden border border-gray-100 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-sm z-10"
          style={{ transform: 'rotateY(0deg)', backgroundColor: cat.bgColor }}
        >
          <div className="mb-2">{cat.icon(cat.color)}</div>
          <span className="text-[12px] font-bold text-gray-800 leading-tight">
            {cat.name}
          </span>
        </div>
        <div 
          className="absolute inset-0 backface-hidden border border-gray-100 rounded-3xl p-4 flex items-center justify-center text-center shadow-inner z-0 overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg)',
            backgroundColor: cat.bgColor
          }}
        >
          <p className="text-[11px] font-medium text-gray-700 leading-snug px-2 text-center">
            {cat.desc}
          </p>
        </div>
      </MotionDiv>
    </div>
  );
};

const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({ onContinue, onBack }) => {
  return (
    <div className="flex-1 flex flex-col p-8 bg-white overflow-y-auto w-full h-full items-center">
      <MotionDiv 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-6 text-center w-full"
      >
        <h2 className="text-xl font-bold deep-teal mb-2">The 6 Architectures</h2>
        <p className="text-xs text-gray-400 font-medium px-4">Tap a tile to see what shaped your world.</p>
      </MotionDiv>

      <div className="grid grid-cols-2 gap-4 mb-8 w-full">
        {CATEGORIES.map(cat => <CategoryTile key={cat.id} cat={cat} />)}
      </div>

      <div className="mt-auto pb-6 w-full max-w-[280px] flex flex-col items-center gap-4">
        <MotionDiv whileTap={{ scale: 0.98 }} className="w-full">
          <button
            onClick={onContinue}
            className="w-full py-4 bg-deep-teal text-white rounded-full font-bold text-sm tracking-widest shadow-lg shadow-teal-900/10"
          >
            START
          </button>
        </MotionDiv>
        
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-deep-teal transition-colors flex items-center gap-1.5 py-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default CategoriesOverview;