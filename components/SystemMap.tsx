import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface SystemMapProps {
  onContinue: () => void;
  onBack: () => void;
}

const MAPPINGS = [
  { cat: 'Adaptive Navigator', type: 'DYNAMICS', color: '#006D77', desc: 'Thrives in change.' },
  { cat: 'Community Compiler', type: 'NETWORKS', color: '#E76F51', desc: 'Thrives in connection.' },
  { cat: 'Hustle Architect', type: 'LOGICS', color: '#E9C46A', desc: 'Thrives in optimization.' },
  { cat: 'Rule Bender', type: 'SHORTCUTS', color: '#CDB4DB', desc: 'Thrives in flexibility.' },
  { cat: 'Order Seeker', type: 'STABILITY', color: '#006D77', desc: 'Thrives in structure.' },
  { cat: 'Emotional Regulator', type: 'HARMONY', color: '#E76F51', desc: 'Thrives in balance.' }
];

const SystemMap: React.FC<SystemMapProps> = ({ onContinue, onBack }) => {
  return (
    <div className="flex-1 flex flex-col p-8 bg-white h-full w-full items-center overflow-hidden">
      <MotionDiv 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-6 text-center w-full"
      >
        <h2 className="text-xl font-bold deep-teal mb-2">The Infrastructure Map</h2>
        <p className="text-xs text-gray-400 font-medium px-4">How your environment built your "vibe."</p>
      </MotionDiv>

      <div className="flex-1 w-full space-y-3 overflow-y-auto pr-1 no-scrollbar mb-6">
        {MAPPINGS.map((item, i) => (
          <MotionDiv
            key={item.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-3xl border border-gray-50 bg-gray-50/50"
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[10px] text-white shadow-sm" style={{ backgroundColor: item.color }}>
              {item.type[0]}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-[12px] font-bold text-gray-800">{item.cat}</h3>
                <span className="text-[9px] font-black tracking-widest opacity-40" style={{ color: item.color }}>{item.type}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium">{item.desc}</p>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="mt-auto pb-6 w-full max-w-[280px] flex flex-col items-center gap-4">
        <MotionDiv whileTap={{ scale: 0.98 }} className="w-full">
          <button
            onClick={onContinue}
            className="w-full py-4 bg-deep-teal text-white rounded-full font-bold text-sm tracking-widest shadow-lg shadow-teal-900/10"
          >
            UNDERSTOOD
          </button>
        </MotionDiv>
        
        <button 
          onClick={onBack}
          className="text-gray-400 hover:text-deep-teal transition-colors flex items-center gap-1.5 py-2"
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

export default SystemMap;