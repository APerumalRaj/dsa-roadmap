import { Check, Lock, Play } from 'lucide-react';

export default function Sidebar({ weeks, selectedWeek, onWeekSelect, getStepStatus, getWeekProgress }) {
  const getWeekStatus = (weekId) => {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return 'locked';
    
    const completedSteps = week.steps.filter(s => getStepStatus(weekId, s.id) === 'completed').length;
    const inProgressSteps = week.steps.filter(s => getStepStatus(weekId, s.id) === 'in-progress').length;
    
    if (completedSteps === week.steps.length) return 'completed';
    if (completedSteps > 0 || inProgressSteps > 0) return 'in-progress';
    if (weekId < selectedWeek) return 'available';
    if (weekId === selectedWeek) return 'current';
    return 'locked';
  };

  return (
    <aside className="w-72 bg-card border-r border-white/10 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">DS</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold gradient-text">DSA Roadmap</h1>
            <p className="text-xs text-slate-400">Mastery in 26 weeks</p>
          </div>
        </div>
      </div>

      {/* Week List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3 px-2">
          Learning Path
        </h2>
        
        <div className="space-y-1">
          {weeks.map((week) => {
            const status = getWeekStatus(week.id);
            const progress = getWeekProgress(week.id, week.steps.length);
            const isSelected = selectedWeek === week.id;
            
            return (
              <button
                key={week.id}
                onClick={() => onWeekSelect(week.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  ${isSelected 
                    ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30' 
                    : 'hover:bg-card-hover border border-transparent'
                  }
                `}
              >
                {/* Week Number Circle */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${status === 'completed' ? 'bg-accent-green text-white' : ''}
                  ${status === 'in-progress' || status === 'current' ? 'bg-accent-purple text-white node-pulse' : ''}
                  ${status === 'available' ? 'bg-card-hover text-slate-300 border border-slate-600' : ''}
                  ${status === 'locked' ? 'bg-card text-slate-500 border border-slate-700' : ''}
                `}>
                  {status === 'completed' ? <Check size={16} /> : week.id}
                </div>
                
                {/* Week Info */}
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium text-slate-200 truncate">
                    {week.title}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {week.subtitle}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-12">
                  <div className="h-1.5 bg-deep rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === 'completed' ? 'bg-accent-green' : 'bg-gradient-to-r from-accent-purple to-accent-blue'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="bg-card-hover rounded-xl p-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Play size={16} className="text-accent-purple" />
            <span>Keep learning!</span>
          </div>
        </div>
      </div>
    </aside>
  );
}