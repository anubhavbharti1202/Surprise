
import React, { useState, useRef } from 'react';

interface AudioHandlerProps {
  audioUrl: string;
  onStart?: () => void;
  onFinishedPlaying?: () => void;
}

const AudioHandler: React.FC<AudioHandlerProps> = ({ audioUrl, onStart, onFinishedPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (isPlaying) return;
    
    if (audioRef.current) {
      setIsPlaying(true);
      if (onStart) onStart();
      
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed.", err);
        setHasError(true);
        setIsPlaying(false);
        // Fallback: trigger finish after a delay so the app isn't stuck
        setTimeout(() => {
            if (onFinishedPlaying) onFinishedPlaying();
        }, 2000);
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onFinishedPlaying) onFinishedPlaying();
  };

  const handleError = () => {
    console.warn("Audio file could not be loaded. Please check if audio.mp3 exists in the root folder.");
    setHasError(true);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        onEnded={handleEnded} 
        onError={handleError}
        preload="auto"
      />
      <button
        onClick={playAudio}
        disabled={isPlaying}
        className={`px-10 py-5 rounded-full font-black transition-all flex items-center gap-4 shadow-xl active:scale-95 ${
          isPlaying 
          ? "bg-blue-100 text-blue-300 cursor-default" 
          : hasError 
            ? "bg-red-100 text-red-500 border border-red-200"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl"
        }`}
      >
        <i className={`fas ${isPlaying ? "fa-volume-up animate-pulse" : hasError ? "fa-exclamation-circle" : "fa-play-circle"} text-3xl`}></i>
        <span className="text-xl uppercase tracking-wider">
          {isPlaying ? "Listening..." : hasError ? "Audio Error - Skip?" : "Play my message"}
        </span>
      </button>
      {hasError && (
        <p className="text-xs text-red-400 italic">Could not find audio.mp3</p>
      )}
    </div>
  );
};

export default AudioHandler;
