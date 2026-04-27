import { Brain, Layers, MessageSquare, TrendingUp, Play, ArrowRight, CheckCircle, Circle, Clock } from 'lucide-react';

const iconMap = {
  Brain,
  Layers,
  MessageSquare,
  TrendingUp
};

export default function MainContent({ 
  week, 
  selectedWeek, 
  getStepStatus, 
  onStepAction, 
  getWeekProgress,
  philosophy,
  overallProgress,
  totalWeeks
}) {
  const weekProgress = getWeekProgress(week.id, week.steps.length);

  const getActionButton = (stepId, status) => {
    switch (status) {
      case 'not-started':
        return (
          <button
            onClick={() => onStepAction(stepId, status)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-purple/20 hover:bg-accent-purple/30 text-accent-purple rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <Play size={16} />
            Start
          </button>
        );
      case 'in-progress':
        return (
          <button
            onClick={() => onStepAction(stepId, status)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <Clock size={16} />
            Continue
          </button>
        );
      case 'completed':
        return (
          <button
            onClick={() => onStepAction(stepId, status)}
            className="flex items-center gap-2 px-4 py-2 bg-accent-green/20 hover:bg-accent-green/30 text-accent-green rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <CheckCircle size={16} />
            Review
          </button>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-accent-green" size={20} />;
      case 'in-progress':
        return <Clock className="text-accent-purple" size={20} />;
      default:
        return <Circle className="text-slate-500" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-3 py-1 bg-accent-green/20 text-accent-green text-xs font-medium rounded-full">Completed</span>;
      case 'in-progress':
        return <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple text-xs font-medium rounded-full">In Progress</span>;
      default:
        return <span className="px-3 py-1 bg-slate-700 text-slate-400 text-xs font-medium rounded-full">Not Started</span>;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                DSA Mastery Roadmap
              </h1>
              <p className="text-slate-400">Zero to Google-Level in 6 Months</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300">
              <Play size={20} />
              Continue Learning
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-card rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Overall Progress</span>
              <span className="text-sm font-semibold text-accent-cyan">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-deep rounded-full overflow-hidden">
              <div 
                className="h-full progress-animated rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>{selectedWeek}/{totalWeeks} weeks completed</span>
              <span>Keep going! 🚀</span>
            </div>
          </div>
        </div>

        {/* Current Week Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white">
                  {week.id}
                </span>
                {week.title}
              </h2>
              <p className="text-slate-400 mt-1">{week.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent-cyan">{weekProgress}%</div>
              <div className="text-xs text-slate-500">week progress</div>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {week.topics.map((topic, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-card-hover rounded-lg text-sm text-slate-300"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Steps Grid */}
          <div className="grid gap-4">
            {week.steps.map((step) => {
              const status = getStepStatus(step.id);
              
              return (
                <div
                  key={step.id}
                  className={`
                    bg-card rounded-2xl p-6 border transition-all duration-300 card-hover
                    ${status === 'completed' ? 'border-accent-green/30' : ''}
                    ${status === 'in-progress' ? 'border-accent-purple/30' : ''}
                    ${status === 'not-started' ? 'border-white/10' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                          {getStatusBadge(status)}
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {getActionButton(step.id, status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Philosophy Section */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Brain size={20} className="text-accent-purple" />
            Our Philosophy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophy.map((item) => {
              const Icon = iconMap[item.icon] || Brain;
              
              return (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl p-5 border border-white/10 hover:border-accent-purple/30 transition-all duration-300 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center mb-4">
                    <Icon className="text-accent-purple" size={20} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}