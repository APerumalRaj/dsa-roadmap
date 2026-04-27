import { Flame, Target, Trophy } from 'lucide-react';

export default function TopBar({ progress, streak, totalCompleted }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="h-16 bg-card/50 border-b border-white/10 flex items-center justify-between px-6 backdrop-blur-sm">
      {/* Left - Title */}
      <div>
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Learning Dashboard
        </h2>
        <p className="text-xs text-slate-500">{today}</p>
      </div>

      {/* Right - Stats */}
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-xl">
          <Flame className="text-orange-500" size={18} />
          <span className="text-orange-500 font-semibold">{streak}</span>
          <span className="text-slate-400 text-sm">day streak</span>
        </div>

        {/* Steps Completed */}
        <div className="flex items-center gap-2 px-4 py-2 bg-accent-purple/10 rounded-xl">
          <Target className="text-accent-purple" size={18} />
          <span className="text-accent-purple font-semibold">{totalCompleted}</span>
          <span className="text-slate-400 text-sm">steps</span>
        </div>

        {/* Progress Ring */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-card-hover"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * progress) / 100}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </header>
  );
}