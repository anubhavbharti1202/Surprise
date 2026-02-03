
import React, { useState } from 'react';

interface AudioHandlerProps {
  audioUrl: string;
  onStart?: () => void;
  onFinishedPlaying?: () => void;
}

const AudioHandler: React.FC<AudioHandlerProps> = ({ audioUrl, onStart, onFinishedPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    if (onStart) onStart();

    const audio = new Audio(audioUrl);
    audio.onended = () => {
      setIsPlaying(false);
      if (onFinishedPlaying) onFinishedPlaying();
    };
    
    audio.play().catch(err => {
      console.error("Audio playback failed.", err);
      setIsPlaying(false);
      if (onFinishedPlaying) onFinishedPlaying();
    });
  };

  return (
    <button
      onClick={playAudio}
      disabled={isPlaying}
      className={`px-10 py-5 rounded-full font-black transition-all flex items-center gap-4 shadow-xl active:scale-95 ${
        isPlaying 
        ? "bg-blue-100 text-blue-300 cursor-default" 
        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl"
      }`}
    >
      <i className={`fas ${isPlaying ? "fa-volume-up animate-pulse" : "fa-play-circle"} text-3xl`}></i>
      <span className="text-xl uppercase tracking-wider">
        {isPlaying ? "Listening..." : "Play my message"}
      </span>
    </button>
  );
};

export default AudioHandler;
