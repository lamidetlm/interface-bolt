import React from 'react';
import { Quest } from '../../types/quest';
import { Star, CircleDot } from 'lucide-react';
import { colors } from '../../styles/theme';

interface QuestListProps {
  quests: Quest[];
  activeQuest: Quest | null;
  completedQuests: string[];
}

export const QuestList: React.FC<QuestListProps> = ({
  quests,
  activeQuest,
  completedQuests,
}) => {
  return (
    <div className="space-y-4">
      {quests.map((quest) => {
        const isCompleted = completedQuests.includes(quest.id);
        const isActive = activeQuest?.id === quest.id;

        return (
          <div
            key={quest.id}
            className={`transform rounded-lg border-2 ${
              isActive 
                ? 'border-[#FFB320] bg-[#456990] shadow-[0_0_12px_#FFB320]' 
                : isCompleted
                ? 'border-[#44CF6C] bg-[#456990]'
                : 'border-[#7C9CB4] bg-[#456990]'
            } p-4 transition-all duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {isCompleted ? (
                  <div className="rounded-full bg-[#44CF6C] p-1.5">
                    <Star size={16} className="text-white" />
                    <span className="sr-only">Terminée</span>
                  </div>
                ) : isActive ? (
                  <div className="rounded-full bg-[#FFB320] p-1.5">
                    <CircleDot size={16} className="text-white" />
                    <span className="sr-only">En cours</span>
                  </div>
                ) : (
                  <div className="rounded-full bg-[#7C9CB4] p-1.5">
                    <CircleDot size={16} className="text-white" />
                    <span className="sr-only">À venir</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-game text-lg text-white">
                  {quest.title}
                  <span className="ml-2 text-xs text-[#B8D0EB]">
                    {isCompleted ? '(Terminée)' : isActive ? '(En cours)' : '(À venir)'}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-[#B8D0EB]">
                  {quest.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};