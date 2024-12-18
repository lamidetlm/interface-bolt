import React from 'react';
import { CircleDot } from 'lucide-react';
import { Quest } from '../../types/quest';

type BarState = 'hide' | 'title' | 'full';

interface ActiveQuestBarProps {
  quest: Quest | null;
  barState: BarState;
  onToggleExpand: () => void;
}

export const ActiveQuestBar: React.FC<ActiveQuestBarProps> = ({
  quest,
  barState,
  onToggleExpand,
}) => {
  const getTransform = () => {
    switch (barState) {
      case 'hide':
        return 'translate(-50%, 150%)';
      case 'title':
        return 'translate(-50%, calc(100% - 4rem))';
      case 'full':
        return 'translate(-50%, 0)';
    }
  };

  if (!quest) return null;

  return (
    <div 
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[66vw] cursor-pointer transition-all duration-500"
      style={{
        transform: getTransform()
      }}
      onClick={onToggleExpand}
    >
      <div className="relative rounded-t-2xl border-4 border-b-0 border-[#1F2937]/80 bg-[#2A3F54]/80 text-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#FFB320] p-1.5">
              <CircleDot size={16} className="text-white" />
            </div>
            <h3 className="text-xl font-game">
              Quête en cours : {quest.title}
            </h3>
          </div>
          <span className="text-sm text-[#B8D0EB]">
            W ou clique pour plus d'infos
          </span>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ${
          barState === 'full' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4">
            <p className="font-game text-[#B8D0EB] whitespace-pre-wrap">
              {quest.detailedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};