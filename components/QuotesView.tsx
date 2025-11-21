
import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { AUTHORS, INITIAL_QUOTES } from '../constants';
import { generateInsight } from '../services/geminiService';
import { Heart, Sparkles, Shuffle, Quote as QuoteIcon, PenLine, Plus, Save } from 'lucide-react';
import { Button } from './ui/Button';

interface QuotesViewProps {
  favorites: Quote[];
  onToggleFavorite: (quote: Quote) => void;
  onAddCustomQuote: (quote: Quote) => void;
}

export const QuotesView: React.FC<QuotesViewProps> = ({ favorites, onToggleFavorite, onAddCustomQuote }) => {
  // Default tab is Favorites
  const [activeTab, setActiveTab] = useState<'favorites' | 'explore'>('favorites');
  
  // State for Explore Tab
  const [displayedQuote, setDisplayedQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for Custom Quote
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');

  // Load a random initial quote when entering Explore tab
  useEffect(() => {
    if (activeTab === 'explore' && !displayedQuote) {
      handleRandomFromDB();
    }
  }, [activeTab]);

  const handleRandomFromDB = () => {
    setError(null);
    const random = INITIAL_QUOTES[Math.floor(Math.random() * INITIAL_QUOTES.length)];
    setDisplayedQuote(random);
    setShowCustomInput(false);
  };

  const handleAIGenerate = async () => {
    setLoading(true);
    setError(null);
    setShowCustomInput(false);
    try {
      const randomAuthor = AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
      const quote = await generateInsight(randomAuthor.name, randomAuthor.style);
      setDisplayedQuote(quote);
    } catch (err) {
      setError('连接灵感源泉失败，请检查网络或 Key。');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustom = () => {
    if (!customText.trim()) return;
    
    const newQuote: Quote = {
      id: `custom_${Date.now()}`,
      text: customText,
      author: customAuthor || '自己',
      source: '我的感悟',
      isGenerated: false
    };
    
    onAddCustomQuote(newQuote);
    setCustomText('');
    setCustomAuthor('');
    setShowCustomInput(false);
    setActiveTab('favorites'); // Switch to favorites to show it's saved
  };

  const isFavorite = (id?: string) => {
    if (!id) return false;
    return favorites.some(q => q.id === id);
  };

  return (
    <div className="flex flex-col h-full p-4 pb-24 space-y-6">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-zen-100 rounded-xl shrink-0">
         <button 
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'favorites' ? 'bg-white text-zen-800 shadow-sm' : 'text-zen-500'}`}
          onClick={() => setActiveTab('favorites')}
        >
          我的收藏
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'explore' ? 'bg-white text-zen-800 shadow-sm' : 'text-zen-500'}`}
          onClick={() => setActiveTab('explore')}
        >
          探索 & 记录
        </button>
      </div>

      {/* FAVORITES TAB */}
      {activeTab === 'favorites' && (
        <div className="space-y-4 animate-fade-in overflow-y-auto h-full pb-20 custom-scrollbar">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-zen-400">
              <Heart size={48} className="mb-4 opacity-20" />
              <p>暂无收藏的智慧。</p>
              <Button variant="ghost" onClick={() => setActiveTab('explore')} className="mt-4">
                去探索或记录
              </Button>
            </div>
          ) : (
            favorites.map(quote => (
              <div key={quote.id} className="bg-white p-6 rounded-xl shadow-sm border border-zen-100 relative group transition-all hover:shadow-md">
                <div className={`absolute -left-1 top-6 w-1 h-8 rounded-r-full ${quote.source === '我的感悟' ? 'bg-amber-400' : 'bg-zen-300'}`}></div>
                <p className="text-zen-800 mb-4 font-medium text-lg leading-relaxed">
                  {quote.text}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-dashed border-zen-100">
                  <p className="text-xs text-zen-500 font-bold">
                    — {quote.author} <span className="font-normal opacity-70">{quote.source ? `《${quote.source}》` : ''}</span>
                  </p>
                  <button 
                    onClick={() => onToggleFavorite(quote)}
                    className="text-rose-400 hover:scale-110 transition-transform p-2"
                    title="取消收藏"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* EXPLORE TAB */}
      {activeTab === 'explore' && (
        <div className="flex flex-col h-full animate-fade-in">
           <div className="flex-1 flex flex-col justify-center mb-6">
             
             {/* Card Area */}
             <div className="bg-gradient-to-br from-white to-zen-50 rounded-3xl p-8 shadow-xl border border-zen-100 relative min-h-[300px] flex flex-col justify-center items-center text-center">
                
                {showCustomInput ? (
                   /* Custom Input Mode */
                   <div className="w-full flex flex-col gap-4 animate-fade-in">
                      <p className="text-sm text-zen-500 font-bold uppercase tracking-widest mb-2">记录当下的感悟</p>
                      <textarea 
                        className="w-full h-32 p-4 bg-white border border-zen-200 rounded-xl text-zen-800 focus:outline-none focus:ring-2 focus:ring-zen-300 resize-none"
                        placeholder="在此刻，你的心告诉了你什么..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                      />
                      <input 
                         className="w-full p-3 bg-white border border-zen-200 rounded-xl text-zen-800 focus:outline-none focus:ring-2 focus:ring-zen-300 text-sm"
                         placeholder="署名 (默认为'自己')"
                         value={customAuthor}
                         onChange={(e) => setCustomAuthor(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                         <Button variant="secondary" onClick={() => setShowCustomInput(false)} className="flex-1">取消</Button>
                         <Button variant="primary" onClick={handleSaveCustom} disabled={!customText.trim()} className="flex-1">
                           <Save size={16} className="mr-2"/> 保存
                         </Button>
                      </div>
                      <p className="text-[10px] text-zen-400 mt-2">保存后将自动加入冥想语录库中展示</p>
                   </div>
                ) : (
                   /* Quote Display Mode */
                   <>
                    <div className="absolute top-6 left-6 opacity-10 text-zen-800">
                      <QuoteIcon size={48} className="rotate-180" />
                    </div>
                    
                    {displayedQuote ? (
                      <div className="z-10 w-full animate-fade-in">
                        <p className="text-xl md:text-2xl font-serif font-medium text-zen-800 leading-relaxed mb-8 tracking-wide">
                          "{displayedQuote.text}"
                        </p>
                        <div className="flex flex-col items-center gap-1">
                           <p className="text-sm text-zen-600 font-bold tracking-widest uppercase">— {displayedQuote.author}</p>
                           {displayedQuote.source && <p className="text-xs text-zen-400">{displayedQuote.source}</p>}
                        </div>

                        {/* Favorite Action */}
                        <div className="mt-8 flex justify-center">
                          <button 
                            onClick={() => onToggleFavorite(displayedQuote)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all shadow-sm ${
                              isFavorite(displayedQuote.id) 
                                ? 'bg-rose-50 text-rose-500 ring-1 ring-rose-200' 
                                : 'bg-white text-zen-400 ring-1 ring-zen-200 hover:ring-rose-200 hover:text-rose-400'
                            }`}
                          >
                            <Heart size={18} className={isFavorite(displayedQuote.id) ? "fill-current" : ""} />
                            <span className="text-xs font-medium">{isFavorite(displayedQuote.id) ? '已收藏' : '收藏'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-zen-400 flex flex-col items-center">
                        <Sparkles size={32} className="mb-2 opacity-50" />
                        <p>探索智慧</p>
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 right-6 opacity-10 text-zen-800">
                      <QuoteIcon size={48} />
                    </div>
                   </>
                )}
             </div>
             
             {error && <p className="text-rose-500 text-xs text-center mt-4">{error}</p>}
           </div>

           {/* Action Buttons */}
           {!showCustomInput && (
             <div className="grid grid-cols-3 gap-3 mb-4">
               <Button 
                 variant="secondary" 
                 onClick={handleRandomFromDB}
                 disabled={loading}
                 className="h-14 flex flex-col gap-1 items-center justify-center"
               >
                 <Shuffle size={20} />
                 <span className="text-[10px]">随机</span>
               </Button>
               <Button 
                 variant="primary" 
                 onClick={handleAIGenerate}
                 isLoading={loading}
                 disabled={!process.env.API_KEY}
                 className="h-14 flex flex-col gap-1 items-center justify-center bg-gradient-to-r from-zen-600 to-zen-500"
               >
                 <Sparkles size={20} />
                 <span className="text-[10px]">AI 生成</span>
               </Button>
               <Button 
                 variant="outline" 
                 onClick={() => setShowCustomInput(true)}
                 disabled={loading}
                 className="h-14 flex flex-col gap-1 items-center justify-center border-dashed"
               >
                 <PenLine size={20} />
                 <span className="text-[10px]">记录感悟</span>
               </Button>
             </div>
           )}
           {!showCustomInput && !process.env.API_KEY && (
             <p className="text-[10px] text-center text-zen-400">配置 API KEY 以启用 AI 功能</p>
           )}
        </div>
      )}
    </div>
  );
};
