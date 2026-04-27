import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dsa-roadmap-progress';

const defaultProgress = {
  currentWeek: 1,
  steps: {},
  streak: 0,
  lastActiveDate: null,
  totalStepsCompleted: 0
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    if (typeof window === 'undefined') return defaultProgress;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultProgress;
      }
    }
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    const lastActive = progress.lastActiveDate;
    
    if (lastActive === today) return;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak = progress.streak;
    if (lastActive !== yesterday.toDateString()) {
      newStreak = lastActive ? 1 : progress.streak + 1;
    } else {
      newStreak = progress.streak + 1;
    }
    
    setProgress(prev => ({
      ...prev,
      streak: newStreak,
      lastActiveDate: today
    }));
  }, [progress.lastActiveDate, progress.streak]);

  const setCurrentWeek = useCallback((weekId) => {
    setProgress(prev => ({ ...prev, currentWeek: weekId }));
  }, []);

  const getStepStatus = useCallback((weekId, stepId) => {
    const key = `${weekId}-${stepId}`;
    return progress.steps[key] || 'not-started';
  }, [progress.steps]);

  const updateStepStatus = useCallback((weekId, stepId, status) => {
    const key = `${weekId}-${stepId}`;
    
    setProgress(prev => {
      const oldStatus = prev.steps[key] || 'not-started';
      const oldCompleted = Object.values(prev.steps).filter(s => s === 'completed').length;
      
      let newTotalCompleted = prev.totalStepsCompleted;
      if (oldStatus === 'completed' && status !== 'completed') {
        newTotalCompleted = Math.max(0, oldCompleted);
      } else if (status === 'completed' && oldStatus !== 'completed') {
        newTotalCompleted = oldCompleted + 1;
      }
      
      return {
        ...prev,
        steps: {
          ...prev.steps,
          [key]: status
        },
        totalStepsCompleted: newTotalCompleted
      };
    });
    
    updateStreak();
  }, [updateStreak]);

  const getWeekProgress = useCallback((weekId, totalSteps) => {
    let completed = 0;
    for (let i = 1; i <= totalSteps; i++) {
      if (getStepStatus(weekId, i) === 'completed') {
        completed++;
      }
    }
    return Math.round((completed / totalSteps) * 100);
  }, [getStepStatus]);

  const getOverallProgress = useCallback((totalWeeks, stepsPerWeek) => {
    const totalSteps = totalWeeks * stepsPerWeek;
    return Math.round((progress.totalStepsCompleted / totalSteps) * 100);
  }, [progress.totalStepsCompleted]);

  return {
    progress,
    setCurrentWeek,
    getStepStatus,
    updateStepStatus,
    getWeekProgress,
    getOverallProgress,
    updateStreak
  };
}