
import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { KiwiMood } from '../types';

interface KiwiBirdProps {
  mood: KiwiMood;
}

const KiwiBird: React.FC<KiwiBirdProps> = ({ mood }) => {
  const kiwiVariants: Variants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    curious: {
      scale: 1,
      opacity: 1,
      right: '5%',
      bottom: '5%',
      left: 'auto',
      top: 'auto',
      x: 0,
      y: [0, -10, 0],
      rotate: [-1, 2, -1],
      transition: {
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.5 }
      }
    },
    happy: {
      scale: 1.2,
      opacity: 1,
      right: '10%',
      bottom: '10%',
      left: 'auto',
      top: 'auto',
      y: [0, -60, 0],
      transition: {
        y: { duration: 0.3, repeat: Infinity, ease: "easeOut" }
      }
    },
    dancing: {
      scale: [1, 1.4, 0.9, 1.3, 1],
      opacity: 1,
      // Dance all over the screen
      left: ['10%', '80%', '20%', '70%', '50%'],
      top: ['10%', '20%', '80%', '70%', '50%'],
      rotate: [0, 360, 720, 1080, 1440],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    sad: {
      scale: 0.8,
      opacity: 1,
      left: 'auto',
      top: 'auto',
      right: '2%',
      bottom: '2%',
      rotate: 25,
      transition: {
        type: 'spring',
        stiffness: 40,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      className="fixed z-50 pointer-events-none flex items-center justify-center"
      variants={kiwiVariants}
      initial="initial"
      animate={mood}
      style={{ 
        width: '180px', 
        height: '180px',
      }}
    >
      <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl w-full h-full">
        {/* Shadow */}
        <motion.ellipse 
          cx="180" cy="180" rx="50" ry="10" fill="black" opacity="0.1" 
          animate={mood === 'dancing' ? { opacity: [0.1, 0.05, 0.1], scale: [1, 0.7, 1] } : {}}
        />
        
        {/* Legs - Cartoon Yellow chunky style from image */}
        <motion.g animate={mood === 'dancing' ? { y: [0, -8, 0], rotate: [0, 15, -15, 0] } : {}}>
          {/* Back Leg */}
          <path d="M225 130 L235 170" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
          <path d="M220 175 Q235 185 250 175" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" />
          
          {/* Front Leg */}
          <path d="M205 135 L200 175" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" />
          <path d="M180 180 Q200 195 220 180" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" />
        </motion.g>

        {/* Body - Rich Brown Pear shape matching reference */}
        <path d="M110 80 C110 40 160 30 220 35 C280 45 290 100 280 140 C270 180 180 185 150 160 C130 140 110 110 110 80 Z" fill="#8B4513" />
        {/* Belly highlight - Lighter brown/tan */}
        <path d="M135 85 C135 65 180 55 220 60 C260 65 265 100 260 130 C255 155 185 160 165 145 C150 130 135 110 135 85 Z" fill="#D2B48C" opacity="0.3" />
        
        {/* Long Curved Yellow Beak */}
        <motion.g 
          style={{ originX: '115px', originY: '95px' }}
          animate={mood === 'curious' ? { rotate: [-5, 5, -5] } : {}}
        >
          <path d="M115 85 L20 130 C15 133 30 138 115 110 L115 85 Z" fill="#FBBF24" />
          <path d="M115 98 L35 125" stroke="#B45309" strokeWidth="1" opacity="0.2" />
        </motion.g>
        
        {/* Eye - Large cartoon style */}
        <g>
          <circle cx="145" cy="75" r="16" fill="white" stroke="#3E2723" strokeWidth="1" />
          <motion.circle 
            cx="148" cy="78" r="7" fill="black" 
            animate={mood === 'curious' ? { x: [-3, 3, -3], y: [-2, 2, -2] } : { x: 0, y: 0 }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="152" cy="72" r="3" fill="white" />
        </g>
        
        {/* Blushing when happy/dancing */}
        <AnimatePresence>
          {(mood === 'happy' || mood === 'dancing') && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <circle cx="165" cy="95" r="10" fill="#FF80AB" opacity="0.6" />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Sad Tears */}
        <AnimatePresence>
          {mood === 'sad' && (
            <motion.path 
              key="tears"
              d="M140 85 Q135 100 140 115" 
              stroke="#81D4FA" 
              strokeWidth="5" 
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ y: [0, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

export default KiwiBird;
