import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckIn } from '../types';
import { Calendar, Flame, Clock } from 'lucide-react';

interface HistoryViewProps {
  checkIns: CheckIn[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ checkIns }) => {
  
  const stats = useMemo(() => {
    const totalMinutes = Math.floor(checkIns.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60);
    const totalSessions = checkIns.length;
    
    // Simple streak calculation (consecutive days)
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Sort checkins desc
    const sorted = [...checkIns].sort((a, b) => b.timestamp - a.timestamp);
    const uniqueDates = new Set(sorted.map(c => c.dateString));
    
    let checkDate = new Date(today);
    
    // Check if today is checked in
    const todayStr = today.toISOString().split('T')[0];
    if (uniqueDates.has(todayStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
    } else {
        // If not today, check yesterday
        checkDate.setDate(checkDate.getDate() - 1);
        const yestStr = checkDate.toISOString().split('T')[0];
        if (!uniqueDates.has(yestStr)) {
            currentStreak = 0; // Streak broken
        }
    }

    // Count backwards
    while (true) {
        const str = checkDate.toISOString().split('T')[0];
        if (uniqueDates.has(str)) {
            if (str !== todayStr) { // Don't double count today
                 currentStreak++;
            }
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    return { totalMinutes, totalSessions, currentStreak };
  }, [checkIns]);

  const weeklyData = useMemo(() => {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const data = days.map(day => ({ name: day, minutes: 0 }));
    
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0,0,0,0);

    checkIns.forEach(c => {
      const d = new Date(c.timestamp);
      if (d >= startOfWeek) {
        const dayIndex = d.getDay();
        data[dayIndex].minutes += Math.floor(c.durationSeconds / 60);
      }
    });
    return data;
  }, [checkIns]);

  // Generate Calendar Grid (Current Month)
  const calendarDays = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday
    
    const days = [];
    // Empty slots
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, []);

  const isCheckedIn = (day: number) => {
      if (!day) return false;
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return checkIns.some(c => c.dateString === dateStr);
  };

  return (
    <div className="space-y-6 pb-20 p-4">
      <h2 className="text-2xl font-light text-zen-800 px-2">我的旅程</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zen-100 flex flex-col items-center justify-center text-center">
          <Clock size={20} className="text-zen-500 mb-1" />
          <span className="text-2xl font-bold text-zen-700">{stats.totalMinutes}</span>
          <span className="text-xs text-zen-400">分钟</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zen-100 flex flex-col items-center justify-center text-center">
          <Calendar size={20} className="text-zen-500 mb-1" />
          <span className="text-2xl font-bold text-zen-700">{stats.totalSessions}</span>
          <span className="text-xs text-zen-400">次数</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zen-100 flex flex-col items-center justify-center text-center">
          <Flame size={20} className="text-orange-400 mb-1" />
          <span className="text-2xl font-bold text-zen-700">{stats.currentStreak}</span>
          <span className="text-xs text-zen-400">连续天数</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-zen-100">
        <h3 className="text-sm font-medium text-zen-600 mb-4">本周专注时长</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9CA3AF'}} 
                dy={10}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
              />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#568275' : '#e5e7eb'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-zen-100">
        <h3 className="text-sm font-medium text-zen-600 mb-4">打卡日历 ({new Date().getMonth() + 1}月)</h3>
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <span key={d} className="text-xs text-zen-400">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, idx) => {
            const checked = day ? isCheckedIn(day) : false;
            return (
              <div 
                key={idx} 
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm
                  ${!day ? 'invisible' : ''}
                  ${checked ? 'bg-zen-500 text-white shadow-sm' : 'text-zen-700 hover:bg-zen-50'}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};