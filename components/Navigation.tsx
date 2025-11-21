import React from 'react';
import { AppTab } from '../types';
import { Flower, BarChart2, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: AppTab.HISTORY, label: '记录', icon: BarChart2 },
    { id: AppTab.MEDITATE, label: '冥想', icon: Flower },
    { id: AppTab.QUOTES, label: '智慧', icon: BookOpen },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-zen-100 px-6 py-3 pb-6 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'text-zen-600 scale-110' : 'text-gray-400 hover:text-zen-400'}`}
          >
            <div className={`p-1.5 rounded-full mb-1 transition-colors ${isActive ? 'bg-zen-100' : 'bg-transparent'}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};