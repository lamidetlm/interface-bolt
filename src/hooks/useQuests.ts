import { useState, useCallback } from 'react';
import { Quest, QuestNotificationType } from '../types/quest';

export const useQuests = (quests: Quest[]) => {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const activateNextQuest = useCallback((complete = false) => {
    if (activeQuest && complete) {
      setCompletedQuests((prev) => [...prev, activeQuest.id]);
      setActiveQuest(null);
    } else if (!activeQuest) {
      const nextQuest = quests.find(
        (quest) =>
          !completedQuests.includes(quest.id) &&
          quest.prerequisites.every((prereq) => completedQuests.includes(prereq))
      );

      if (nextQuest) {
        setActiveQuest(nextQuest);
      }
    }
  }, [activeQuest, completedQuests, quests]);

  return {
    activeQuest,
    completedQuests,
    activateNextQuest,
  };
};