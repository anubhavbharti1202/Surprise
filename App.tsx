
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, KiwiMood } from './types';
import KiwiBird from './components/KiwiBird';
import AudioHandler from './components/AudioHandler';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [kiwiMood, setKiwiMood] = useState<KiwiMood>('curious');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioDone, setIsAudioDone] = useState(false);

  const audioUrl = './audio.mp3';
  const proposalImgUrl = './proposal.png';
  const backgroundImgUrl = './background.jpg'; // Ensure the background image is saved as background.jpg

  const handleNoClick = () => {
    setState(AppState.REJECTED);
    setKiwiMood('sad');
  };

  const handleYesClick = () => {
    setKiwiMood('happy');
    setTimeout(() => {
      setState(AppState.ACCEPTED);
      setKiwiMood('dancing');
    }, 800);
  };

  const handleAudioStart = () => {
    setIsAudioPlaying(true);
    setKiwiMood('curious');
  };

  const handleAudioFinished = () => {
    setIsAudioPlaying(false);
    setIsAudioDone(true);
    // Transition to the big question after a romantic pause
    setTimeout(() => {
        setState(AppState.QUESTION);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Main Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-blue-100"
        style={{
          backgroundImage: `url(${backgroundImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      </div>

      {/* The Kiwi Bird */}
      <KiwiBird mood={kiwiMood} />

      <AnimatePresence mode="wait">
        {state === AppState.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 p-8 md:p-12 rounded-[3rem] bg-white/80 border border-white/50 backdrop-blur-xl max-w-2xl w-full shadow-2xl"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold text-blue-600 mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hey Amore...
            </motion.h2>

            <div className="min-h-[120px] mb-8">
                <AnimatePresence mode="wait">
                    {!isAudioPlaying && !isAudioDone ? (
                        <motion.p 
                            key="pre-play"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl md:text-2xl text-blue-400 font-medium italic"
                        >
                            "I have a little message for you..."
                        </motion.p>
                    ) : (
                        <motion.div 
                            key="playing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                        >
                            <p className="text-lg md:text-xl text-blue-700 font-medium leading-relaxed italic">
                                "Amore mio, sei la cosa migliore che mi sia mai capitata... 
                                Sei così bella, intelligente e così motivante... 
                                A volte sembra ancora un sogno da cui non voglio mai svegliarmi."
                            </p>
                            {isAudioPlaying && (
                                <div className="flex justify-center gap-1">
                                    {[0, 1, 2, 3].map(i => (
                                        <motion.div 
                                            key={i}
                                            className="w-1 bg-blue-400 rounded-full"
                                            animate={{ height: [10, 30, 10] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col items-center gap-6">
              {!isAudioDone && (
                  <AudioHandler 
                    audioUrl={audioUrl} 
                    onStart={handleAudioStart}
                    onFinishedPlaying={handleAudioFinished}
                  />
              )}
              
              {isAudioDone && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-blue-500 font-black flex flex-col items-center gap-2"
                >
                    <div className="text-4xl mb-2">✨</div>
                    <p className="text-xl uppercase tracking-widest">Ti amo per sempre</p>
                </motion.div>
              )}
            </div>
            
            <button 
                onClick={() => setState(AppState.QUESTION)}
                className="mt-12 text-blue-400 text-xs hover:text-blue-600 underline transition-all font-bold uppercase tracking-widest"
            >
                Skip to the question
            </button>
          </motion.div>
        )}

        {state === AppState.QUESTION && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 bg-white/90 p-10 md:p-14 rounded-[4rem] shadow-2xl border-4 border-white/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center"
          >
            {/* The Proposing Image */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mb-8 w-full max-w-[320px]"
            >
                <motion.div 
                    className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.img 
                    src={proposalImgUrl} 
                    alt="Proposal" 
                    className="relative z-10 w-full h-auto drop-shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const diamond = document.createElement('div');
                            diamond.innerHTML = '💎';
                            diamond.className = 'text-8xl mb-4';
                            parent.appendChild(diamond);
                        }
                    }}
                />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black text-blue-600 mb-12 leading-tight">
              Will you be my Valentine?
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#1E40AF', boxShadow: "0 25px 50px -12px rgba(30, 64, 175, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-16 py-7 bg-blue-600 text-white text-3xl font-black rounded-full shadow-2xl border-b-8 border-blue-800 w-full sm:w-auto"
              >
                YES! 💙
              </motion.button>
              <motion.button
                whileHover={{ x: [0, -10, 10, -10, 10, 0] }}
                onClick={handleNoClick}
                className="px-10 py-4 bg-white/50 text-blue-300 text-xl font-bold rounded-full border-2 border-white/80 hover:text-blue-500 transition-colors w-full sm:w-auto"
              >
                No... 🥺
              </motion.button>
            </div>
          </motion.div>
        )}

        {state === AppState.ACCEPTED && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <div className="bg-white/90 p-16 rounded-[5rem] shadow-2xl border-t-8 border-blue-500 max-w-3xl border-x border-white/50 backdrop-blur-xl">
                <div className="text-8xl mb-8">💖✨💍</div>
                <h1 className="text-5xl md:text-7xl font-black text-blue-600 mb-8 uppercase tracking-tighter">
                  Grazie mille Amore!
                </h1>
                <p className="text-3xl md:text-5xl text-blue-500 font-black italic drop-shadow-sm">
                  I LOVE YOU more than my pp
                </p>
                <div className="mt-12 flex justify-center gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div 
                            key={i}
                            className="w-4 h-4 rounded-full bg-blue-600"
                            animate={{ y: [-15, 15, -15], scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                        />
                    ))}
                </div>
            </div>
          </motion.div>
        )}

        {state === AppState.REJECTED && (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10"
          >
            <div className="bg-white/95 p-12 rounded-[3rem] shadow-2xl border-2 border-white/50 max-w-lg backdrop-blur-md">
                <div className="text-6xl mb-6">💔</div>
                <h2 className="text-3xl text-blue-700 font-black mb-6">
                  Awww.... My heart is broken... qvq
                </h2>
                <p className="text-xl text-blue-400 mb-8 font-bold italic">
                  I'll keep trying though...
                </p>
                <p className="text-2xl text-blue-800 font-black italic">
                  I LOVE YOU more than my pp
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => { setState(AppState.QUESTION); setKiwiMood('curious'); }}
                  className="mt-10 px-8 py-3 text-blue-300 font-black border-2 border-blue-100 border-dashed rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest text-sm"
                >
                  Change your mind? 🥺
                </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-[10px] font-black tracking-[0.4em] uppercase text-center z-10 bg-blue-600/30 px-4 py-1 rounded-full backdrop-blur-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        Dash & Kiwi • Sempre!
      </motion.div>
    </div>
  );
};

export default App;
