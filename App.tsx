
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, KiwiMood } from './types.ts';
import KiwiBird from './components/KiwiBird.tsx';
import AudioHandler from './components/AudioHandler.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.INTRO);
  const [kiwiMood, setKiwiMood] = useState<KiwiMood>('curious');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioDone, setIsAudioDone] = useState(false);

  // Asset paths (explicit relative paths for local assets)
  const audioUrl = './audio.mp3';
  const proposalImgUrl = './proposal.png';
  const backgroundImgUrl = './background.jpg';

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
    setTimeout(() => {
        setState(AppState.QUESTION);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-sky-50">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-blue-50"
        style={{
          backgroundImage: `url(${backgroundImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]"></div>
      </div>

      <KiwiBird mood={kiwiMood} />

      <AnimatePresence mode="wait">
        {state === AppState.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 p-8 md:p-12 rounded-[3rem] bg-white/95 border border-blue-100 backdrop-blur-xl max-w-2xl w-full shadow-2xl"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-blue-600 mb-8"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hey Amore...
            </motion.h2>

            <div className="min-h-[160px] mb-10 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!isAudioPlaying && !isAudioDone ? (
                        <motion.p 
                            key="pre-play"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl md:text-2xl text-sky-400 font-medium italic leading-relaxed"
                        >
                            "I have a special message just for you..."
                        </motion.p>
                    ) : (
                        <motion.div 
                            key="playing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <p className="text-xl md:text-2xl text-blue-700 font-bold leading-relaxed italic drop-shadow-sm">
                                "Amore mio, sei la cosa migliore che mi sia mai capitata... 
                                Sei così bella, intelligente e così motivante... 
                                A volte sembra ancora un sogno da cui non voglio mai svegliarmi."
                            </p>
                            {isAudioPlaying && (
                                <div className="flex justify-center gap-1">
                                    {[0, 1, 2, 3, 4].map(i => (
                                        <motion.div 
                                            key={i}
                                            className="w-1.5 bg-blue-400 rounded-full"
                                            animate={{ height: [15, 45, 15] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
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
                    <div className="text-5xl mb-2 animate-bounce">✨</div>
                    <p className="text-2xl uppercase tracking-[0.2em]">Ti amo per sempre</p>
                </motion.div>
              )}
            </div>
            
            <button 
                onClick={() => setState(AppState.QUESTION)}
                className="mt-12 text-blue-300 text-xs hover:text-blue-500 underline transition-all font-bold uppercase tracking-widest"
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
            className="text-center z-10 bg-white/95 p-10 md:p-14 rounded-[4rem] shadow-2xl border-4 border-blue-50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center"
          >
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mb-8 w-full max-w-[320px]"
            >
                <motion.div 
                    className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <img 
                    src={proposalImgUrl} 
                    alt="Proposal" 
                    className="rounded-3xl shadow-xl border-8 border-white relative z-10 mx-auto"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black text-blue-800 mb-10 leading-tight">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYesClick}
                className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-black px-12 py-5 rounded-3xl shadow-xl transition-colors min-w-[160px]"
              >
                YES! 💙
              </motion.button>

              <motion.button
                whileHover={{ x: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                onClick={handleNoClick}
                className="bg-gray-100 hover:bg-gray-200 text-gray-400 text-xl font-bold px-10 py-4 rounded-3xl shadow-md min-w-[140px]"
              >
                No...
              </motion.button>
            </div>
          </motion.div>
        )}

        {state === AppState.ACCEPTED && (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 p-12 bg-white/90 rounded-[4rem] shadow-2xl backdrop-blur-xl border-4 border-blue-200"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-6"
            >
              💙
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-blue-600 mb-4">
              I KNEW IT!
            </h1>
            <p className="text-2xl text-blue-400 font-bold mb-8 italic">
              Yay!:D Grazie mille Amore, I LOVE YOU more than my pp
            </p>
            <div className="flex flex-wrap justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                    <motion.span 
                        key={i}
                        animate={{ y: [0, -20, 0] }}
                        transition={{ delay: i * 0.1, repeat: Infinity }}
                        className="text-4xl"
                    >
                        ✨
                    </motion.span>
                ))}
            </div>
          </motion.div>
        )}

        {state === AppState.REJECTED && (
          <motion.div
            key="rejected"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center z-10 p-10 bg-white/95 rounded-[3rem] shadow-xl max-w-md border border-gray-100"
          >
            <div className="text-6xl mb-4">🥺</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Are you sure?</h2>
            <p className="text-lg text-gray-500 mb-8 italic leading-relaxed">
              Awww.... My heart is broken... qvq I'll keep trying though... I LOVE YOU more than my pp
            </p>
            <button 
                onClick={() => { setState(AppState.QUESTION); setKiwiMood('curious'); }}
                className="bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-600 transition-all"
            >
                Wait, I changed my mind!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
