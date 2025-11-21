
import React, { useState, useEffect } from 'react';
import { AppTab, CheckIn, Quote } from './types';
import { INITIAL_QUOTES } from './constants';
import { Navigation } from './components/Navigation';
import { MeditationView } from './components/MeditationView';
import { HistoryView } from './components/HistoryView';
import { QuotesView } from './components/QuotesView';

const App: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.MEDITATE);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCheckIns = localStorage.getItem('mindzen_checkins');
    if (storedCheckIns) {
      setCheckIns(JSON.parse(storedCheckIns));
    }

    const storedFavorites = localStorage.getItem('mindzen_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      // Set initial favorites if empty to populate some content
      setFavorites(INITIAL_QUOTES.slice(0, 2));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('mindzen_checkins', JSON.stringify(checkIns));
  }, [checkIns]);

  useEffect(() => {
    localStorage.setItem('mindzen_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleCheckIn = (durationSeconds: number) => {
    const now = new Date();
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      timestamp: now.getTime(),
      dateString: now.toISOString().split('T')[0],
      durationSeconds,
    };
    setCheckIns(prev => [...prev, newCheckIn]);
  };

  const handleToggleFavorite = (quote: Quote) => {
    setFavorites(prev => {
      const exists = prev.find(q => q.id === quote.id);
      if (exists) {
        return prev.filter(q => q.id !== quote.id);
      } else {
        return [...prev, quote];
      }
    });
  };

  const handleAddCustomQuote = (quote: Quote) => {
    setFavorites(prev => [quote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zen-50 text-slate-800 font-sans selection:bg-zen-200">
      {/* Content Area */}
      <main className="max-w-lg mx-auto h-screen flex flex-col relative overflow-hidden bg-white shadow-2xl sm:rounded-3xl sm:my-4 sm:h-[calc(100vh-2rem)]">
        
        {/* Header / Top Bar - Only show for non-meditation tabs to allow full screen immersion */}
        {activeTab !== AppTab.MEDITATE && (
          <div className="px-6 pt-8 pb-4 flex justify-between items-center z-20 relative bg-white/80 backdrop-blur-sm">
            <h1 className="text-xl font-bold tracking-wider text-zen-800 flex items-center gap-2">
              banban
            </h1>
            <div className="text-xs font-medium bg-zen-100 text-zen-600 px-2 py-1 rounded-md">
              {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}
            </div>
          </div>
        )}

        {/* Render View based on Tab */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {activeTab === AppTab.MEDITATE && (
            <div className="animate-fade-in w-full h-full">
              <MeditationView 
                onCheckIn={handleCheckIn} 
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          )}
          
          {activeTab === AppTab.HISTORY && (
            <div className="animate-fade-in h-full overflow-y-auto pb-24">
              <HistoryView checkIns={checkIns} />
            </div>
          )}

          {activeTab === AppTab.QUOTES && (
            <div className="animate-fade-in h-full overflow-y-auto pb-24">
              <QuotesView 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite}
                onAddCustomQuote={handleAddCustomQuote} 
              />
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </main>

      {/* Global Styles for specific animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;