import React from 'react';
import { motion } from 'framer-motion';

interface HomeProps {
  onStart: () => void;
  error?: string | null;
}

const MotionDiv = motion.div as any;

const Home: React.FC<HomeProps> = ({ onStart, error }) => {
  return (
    <div className="flex-1 flex flex-col items-center p-8 relative overflow-hidden bg-white h-full w-full">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-lilac/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-48 h-48 bg-mustard/10 rounded-full blur-2xl pointer-events-none" />

      <MotionDiv 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full flex-1 flex flex-col items-center justify-center text-center relative z-10"
      >
        <div className="relative mb-10">
          <div className="w-32 h-32 relative">
             <MotionDiv 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-2 border-dashed border-[#CDB4DB] rounded-full opacity-40"
             />
             <div className="absolute inset-4 bg-[#E9C46A] rounded-[2.2rem] transform rotate-12 shadow-inner" />
             <div className="absolute inset-4 bg-[#006D77] rounded-[2.2rem] transform -rotate-12 opacity-90" />
             <div className="absolute inset-4 bg-[#E76F51] rounded-full scale-50" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 tracking-tight leading-tight">
          Raised by <span className="deep-teal">Systems</span>
        </h1>
        <p className="mustard font-bold text-[11px] tracking-[0.2em] mb-6 uppercase">
          Every system leaves a mark
        </p>
        
        <p className="text-gray-500 mb-12 max-w-[280px] leading-relaxed italic text-sm">
          "Not personality traits. Infrastructure."
        </p>

        {error && (
          <MotionDiv 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 p-4 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 w-full"
          >
            {error}
          </MotionDiv>
        )}

        <MotionDiv
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-[280px]"
        >
          <button
            onClick={onStart}
            className="group relative w-full py-5 bg-deep-teal text-white rounded-full font-bold shadow-lg shadow-teal-900/20 transition-all overflow-hidden"
          >
            <span className="relative z-10 tracking-wide text-sm">See What Raised You</span>
            <MotionDiv 
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </button>
        </MotionDiv>
      </MotionDiv>

      <div className="mt-auto pt-8 flex items-center justify-center gap-4 w-full border-t border-gray-50 relative z-10 pb-4">
         <div className="w-2 h-2 rounded-full bg-mustard opacity-40" />
         <div className="w-2 h-2 rounded-full bg-coral opacity-40" />
         <div className="w-2 h-2 rounded-full bg-deep-teal opacity-40" />
         <div className="w-2 h-2 rounded-full bg-lilac opacity-40" />
      </div>
    </div>
  );
};

export default Home;