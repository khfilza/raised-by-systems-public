
import React from 'react';
import { motion } from 'framer-motion';

const MotionPath = motion.path as any;
const MotionRect = motion.rect as any;
const MotionCircle = motion.circle as any;
const MotionDiv = motion.div as any;

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white h-full w-full">
      <div className="relative w-64 h-48 mb-12 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <MotionPath
            d="M 20 80 Q 70 0 120 80 T 180 80"
            fill="transparent"
            stroke="#006D77"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <MotionPath
            d="M 30 100 Q 100 80 170 100"
            fill="transparent"
            stroke="#E76F51"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <MotionCircle
            cx="100" cy="80" r="10"
            fill="#E9C46A"
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <MotionRect
            x="105" y="85" width="12" height="18" rx="4"
            fill="#CDB4DB"
            animate={{ 
              rotate: [0, 15, -15, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <MotionDiv
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[12px] uppercase tracking-[0.4em] text-gray-400 font-bold max-w-[120px]"
          >
            Connecting the dots
          </MotionDiv>
        </div>
      </div>

      <div className="space-y-4 max-w-[300px]">
        <h2 className="text-2xl font-bold deep-teal leading-tight tracking-tight">Tracing what shaped you...</h2>
        <p className="text-sm text-gray-400 font-medium leading-relaxed italic opacity-80">
          Not traits. Not types.<br/>The systems you grew inside.
        </p>
      </div>

      <div className="absolute bottom-16 w-40 h-1.5 bg-gray-50 rounded-full overflow-hidden">
        <MotionDiv
          className="h-full bg-deep-teal"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
