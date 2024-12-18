import React from 'react';
import { Star, CircleDot } from 'lucide-react';
import { Quest } from '../../types/quest';

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
                  </div>
                ) : isActive ? (
                  <div className="rounded-full bg-[#FFB320] p-1.5">
                    <CircleDot size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="rounded-full bg-[#7C9CB4] p-1.5">
                    <CircleDot size={16} className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className={`font-game text-lg ${isCompleted ? 'text-[#44CF6C]' : 'text-white'}`}>
                  <span className={isCompleted ? 'line-through' : ''}>
                    {quest.title}
                  </span>
                  {isCompleted && (
                    <span className="ml-2 text-xs text-[#44CF6C]">
                      Complétée
                    </span>
                  )}
                  {isActive && (
                    <span className="ml-2 text-xs text-[#FFB320]">
                      en cours
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-[#B8D0EB]">
                  {quest.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-12 text-center text-sm text-[#B8D0EB]">
        Cliquez ou C pour masquer
      </div>
    </div>
  );
};