
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, CheckCircle, X, Music, Volume2, Heart } from 'lucide-react';
import { Button } from './ui/Button';
import { NATURE_SOUNDS, INITIAL_QUOTES, BACKGROUND_IMAGES } from '../constants';
import { CheckIn, Quote } from '../types';

interface MeditationViewProps {
  onCheckIn: (duration: number) => void;
  favorites: Quote[];
  onToggleFavorite: (quote: Quote) => void;
}

export const MeditationView: React.FC<MeditationViewProps> = ({ onCheckIn, favorites, onToggleFavorite }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isActive, setIsActive] = useState(false);
  const [selectedSound, setSelectedSound] = useState(NATURE_SOUNDS[1]); // Default Forest
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [initialDuration, setInitialDuration] = useState(300);
  const [quote, setQuote] = useState<Quote>(INITIAL_QUOTES[0]);
  const [showSoundMenu, setShowSoundMenu] = useState(false);
  
  // Background Image State - Initialize with a random image
  const [bgImage, setBgImage] = useState<string | null>(() => {
     return BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
  });
  
  // Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Merge databases for the pool
  const quotePool = useMemo(() => {
    const map = new Map<string, Quote>();
    INITIAL_QUOTES.forEach(q => map.set(q.id, q));
    favorites.forEach(q => map.set(q.id, q));
    return Array.from(map.values());
  }, [favorites]);

  // Update Clock
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Random Quote from the FULL POOL
  const getRandomQuote = () => {
    if (quotePool.length === 0) return INITIAL_QUOTES[0];
    return quotePool[Math.floor(Math.random() * quotePool.length)];
  };

  // Initial Load Only
  useEffect(() => {
    setQuote(getRandomQuote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleChangeBackground = () => {
    const randomBg = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
    setBgImage(randomBg);
  };

  const handleSwitchQuote = () => {
    // Change Quote
    let newQuote;
    if (quotePool.length <= 1) {
       newQuote = quotePool[0];
    } else {
        do {
        newQuote = quotePool[Math.floor(Math.random() * quotePool.length)];
        } while (newQuote.id === quote.id);
    }
    setQuote(newQuote);
    
    // SYNC: Change Background immediately
    handleChangeBackground();
  };

  // Audio Control
  useEffect(() => {
    if (audioRef.current) {
      if (isActive && selectedSound.audioUrl) {
        audioRef.current.src = selectedSound.audioUrl;
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isActive, selectedSound]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialDuration);
    setSessionCompleted(false);
  };

  const handleDurationChange = (minutes: number) => {
    setIsActive(false);
    setInitialDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setSessionCompleted(false);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setSessionCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleComplete = () => {
    onCheckIn(initialDuration);
    resetTimer();
  };

  const isFavorite = favorites.some(q => q.id === quote.id);

  // Progress Ring Calculation
  const progress = ((initialDuration - timeLeft) / initialDuration) * 100;
  const radius = 40; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} />

      {/* Background Layer */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000 bg-zen-900">
        {/* Always render a gradient base so if image fails, it looks good */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-800 to-zen-900" />
        
        {bgImage && (
             <img 
              src={bgImage}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover animate-fade-in transition-opacity duration-1000"
              onError={(e) => {
                // If image fails to load, hide it so the gradient shows
                e.currentTarget.style.display = 'none';
              }}
            />
        )}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col h-full p-6 text-white">
        
        {/* TOP: Clock & Date */}
        <div className="flex flex-col items-center mt-10 mb-4 animate-fade-in select-none">
          <h1 className="text-6xl font-extralight tracking-tighter font-sans drop-shadow-lg text-white/95">
            {currentTime.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute:'2-digit' })}
          </h1>
          <p className="text-sm font-light tracking-widest opacity-90 mt-1 uppercase text-white/80">
            {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>

        {/* MIDDLE: Quote Area */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
            
            {/* 1. The Clickable Quote Card (Wide & Short) */}
            {/* This is the ONLY area that switches quote */}
            <div 
                onClick={(e) => {
                    e.preventDefault();
                    handleSwitchQuote();
                }}
                className="relative w-full max-w-3xl h-32 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl cursor-pointer transition-all duration-300 hover:bg-white/15 active:scale-[0.98] flex flex-col items-center justify-center px-6 py-4 group select-none z-10"
            >
                <div className="w-full h-full flex items-center justify-center overflow-y-auto custom-scrollbar pointer-events-none">
                    <p className="text-center text-lg md:text-xl font-light leading-relaxed drop-shadow-md text-white/95 line-clamp-3">
                    "{quote.text}"
                    </p>
                </div>
                
                {/* Hint Text */}
                <div className="absolute bottom-1 w-full text-center opacity-0 group-hover:opacity-60 transition-opacity text-[9px] text-white/70 uppercase tracking-widest pointer-events-none">
                    轻触切换
                </div>
            </div>

            {/* 2. The Action Row (Author & Heart) */}
            {/* Completely separated from the card above */}
            <div className="mt-5 flex items-center justify-center gap-3 w-full max-w-3xl animate-fade-in select-none z-20">
                 
                 {/* Heart Button */}
                 <button 
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        e.preventDefault();
                        onToggleFavorite(quote);
                    }}
                    className="group p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/5 transition-all active:scale-90 backdrop-blur-sm"
                    title={isFavorite ? "取消收藏" : "加入收藏"}
                >
                    <Heart 
                        size={20} 
                        fill={isFavorite ? "#f43f5e" : "none"} 
                        className={`transition-all duration-300 ${
                            isFavorite 
                            ? "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
                            : "text-white/80 group-hover:text-rose-300"
                        }`} 
                    />
                </button>

                 {/* Author Info */}
                 <div className="flex items-baseline gap-2">
                    <span className="text-base font-medium text-white drop-shadow-lg tracking-wide">
                        — {quote.author}
                    </span>
                    {quote.source && (
                         <span className="text-[10px] text-white/70 font-light hidden sm:inline">
                            《{quote.source}》
                        </span>
                    )}
                 </div>
            </div>
        </div>

        {/* BOTTOM: Controls */}
        <div className="mb-20 mt-4 flex flex-col items-center gap-8">
          
          {/* Timer Ring */}
          {!sessionCompleted ? (
            <div className="relative flex items-center justify-center group">
              <svg className="transform -rotate-90 w-28 h-28 drop-shadow-xl">
                {/* Removed static track circle for cleaner look */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              
              <button 
                onClick={toggleTimer}
                className={`
                  absolute flex items-center justify-center rounded-full 
                  w-16 h-16 transition-all duration-300
                  ${isActive 
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                    : 'bg-white text-zen-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105'
                  }
                `}
              >
                {isActive ? (
                   <div className="flex flex-col items-center justify-center">
                     <span className="text-[10px] font-mono mb-0.5 opacity-90 font-medium tracking-widest">{formatTime(timeLeft)}</span>
                     <Pause size={16} fill="white" className="opacity-80" />
                   </div>
                ) : (
                   <Play size={20} fill="currentColor" className="ml-1 text-zen-800" />
                )}
              </button>
            </div>
          ) : (
             <Button onClick={handleComplete} className="bg-white text-zen-800 shadow-xl animate-bounce px-8 py-3 rounded-full font-light tracking-widest">
               <CheckCircle size={18} className="mr-2" /> 完成打卡
             </Button>
          )}

          {/* Bottom Toolbar */}
          <div className="flex items-center gap-4 bg-black/30 backdrop-blur-xl px-6 py-3 rounded-full border border-white/5 shadow-lg">
            
            {/* Sound Toggle */}
            <button 
              onClick={() => setShowSoundMenu(!showSoundMenu)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${showSoundMenu ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <Music size={18} />
              <span className="text-xs font-medium tracking-wide max-w-[4rem] truncate hidden sm:inline">{selectedSound.name}</span>
            </button>

             <div className="h-4 w-px bg-white/10"></div>
             
             {/* Time Selector */}
             <div className="flex gap-1">
                {[5, 15, 30].map(m => (
                  <button
                    key={m}
                    onClick={() => handleDurationChange(m)}
                    className={`text-xs font-medium px-2 py-1 rounded transition-all ${initialDuration === m * 60 ? 'text-white bg-white/10 shadow-sm' : 'text-white/40 hover:text-white/80'}`}
                  >
                    {m}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Sound Menu Popup */}
      {showSoundMenu && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 z-30 animate-fade-in shadow-2xl">
           <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
             <span className="text-xs font-bold text-white/90 uppercase tracking-wider pl-1">选择环境音</span>
             <button onClick={() => setShowSoundMenu(false)}><X size={18} className="text-white/50 hover:text-white"/></button>
           </div>
           <div className="grid grid-cols-4 gap-3">
             {NATURE_SOUNDS.map(sound => (
               <button
                 key={sound.id}
                 onClick={() => {
                    setSelectedSound(sound);
                    setShowSoundMenu(false); // Auto close on select
                 }}
                 className={`flex flex-col items-center p-3 rounded-2xl transition-all ${selectedSound.id === sound.id ? 'bg-white/20 ring-1 ring-white/40 shadow-inner' : 'hover:bg-white/10'}`}
               >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-white/5 ${selectedSound.id === sound.id ? 'text-white' : 'text-white/50'}`}>
                    <Volume2 size={18}/>
                 </div>
                 <span className={`text-[10px] font-medium ${selectedSound.id === sound.id ? 'text-white' : 'text-white/50'}`}>{sound.name}</span>
               </button>
             ))}
           </div>
        </div>
      )}

    </div>
  );
};
    