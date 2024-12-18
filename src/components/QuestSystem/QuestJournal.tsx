import React from 'react';
import { QuestList } from './QuestList';
import { Quest } from '../../types/quest';

interface QuestJournalProps {
  quests: Quest[];
  activeQuest: Quest | null;
  completedQuests: string[];
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export const QuestJournal: React.FC<QuestJournalProps> = ({
  quests,
  activeQuest,
  completedQuests,
  isVisible,
  onToggleVisibility,
}) => {
  return (
    <div className="fixed right-0 top-0 h-full">
      {!isVisible && (
        <div 
          className="fixed right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-500"
          onClick={onToggleVisibility}
        >
          <div className="flex h-24 w-12 flex-col items-center justify-center gap-4 rounded-l-xl border-4 border-r-0 border-[#1F2937]/80 bg-[#2A3F54]/80 shadow-lg cursor-pointer">
            <img 
              src="https://i.imgur.com/SpaZDPW.png" 
              alt="Touche C"
              className="h-6 w-6 object-contain"
            />
            <img 
              src="https://i.imgur.com/EZ2gpAN.png" 
              alt="Clic gauche"
              className="h-6 w-6 object-contain"
            />
          </div>
        </div>
      )}
      
      <div
        className={`relative flex h-[90vh] w-[30vw] transform transition-transform duration-500 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '5vh' }}
        onClick={onToggleVisibility}
      >
        <div className="h-full w-full overflow-y-auto rounded-l-2xl border-4 border-r-0 border-[#1F2937]/80 bg-[#2A3F54]/80 p-6 shadow-[-4px_0_12px_rgba(0,0,0,0.2)]">
          <div className="mb-6">
            <h2 className="font-game text-3xl text-white">
              Carnet de Quêtes
            </h2>
          </div>
          
          <QuestList
            quests={quests}
            activeQuest={activeQuest}
            completedQuests={completedQuests}
          />
        </div>
      </div>
    </div>
  );
};