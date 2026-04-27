import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import TopBar from './components/TopBar';
import { roadmapData, philosophyData } from './data/roadmapData';
import { useProgress } from './hooks/useProgress';

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const {
    progress,
    setCurrentWeek,
    getStepStatus,
    updateStepStatus,
    getWeekProgress,
    getOverallProgress,
    updateStreak
  } = useProgress();

  const currentWeekData = roadmapData.find(w => w.id === selectedWeek) || roadmapData[0];

  const handleWeekSelect = (weekId) => {
    setSelectedWeek(weekId);
    setCurrentWeek(weekId);
  };

  const handleStepAction = (stepId, currentStatus) => {
    let newStatus;
    switch (currentStatus) {
      case 'not-started':
        newStatus = 'in-progress';
        break;
      case 'in-progress':
        newStatus = 'completed';
        break;
      case 'completed':
        newStatus = 'in-progress';
        break;
      default:
        newStatus = 'in-progress';
    }
    updateStepStatus(selectedWeek, stepId, newStatus);
  };

  const overallProgress = getOverallProgress(roadmapData.length, 4);

  return (
    <div className="flex min-h-screen bg-deep">
      <Sidebar
        weeks={roadmapData}
        selectedWeek={selectedWeek}
        onWeekSelect={handleWeekSelect}
        getStepStatus={getStepStatus}
        getWeekProgress={getWeekProgress}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar
          progress={overallProgress}
          streak={progress.streak}
          totalCompleted={progress.totalStepsCompleted}
        />
        
        <MainContent
          week={currentWeekData}
          selectedWeek={selectedWeek}
          getStepStatus={(stepId) => getStepStatus(selectedWeek, stepId)}
          onStepAction={handleStepAction}
          getWeekProgress={(steps) => getWeekProgress(selectedWeek, steps)}
          philosophy={philosophyData}
          overallProgress={overallProgress}
          totalWeeks={roadmapData.length}
        />
      </div>
    </div>
  );
}