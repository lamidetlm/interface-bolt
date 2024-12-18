import React from 'react';
import { Star, CircleDot } from 'lucide-react';

interface CenterNotificationProps {
  message: string;
}

export const CenterNotification: React.FC<CenterNotificationProps> = ({ message }) => {
  const [title, content] = message.split('\n');
  const isCompletion = title.includes('accomplie');

  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 animate-fadeIn">
      <div className="rounded-2xl border-4 border-[#1F2937] bg-[#2A3F54]/80 p-4 shadow-xl">
        <div className="flex items-center gap-3">
          {isCompletion ? (
            <div className="rounded-full bg-[#44CF6C] p-2">
              <Star className="text-white" size={20} />
            </div>
          ) : (
            <div className="rounded-full bg-[#FFB320] p-2">
              <CircleDot className="text-white" size={20} />
            </div>
          )}
          <div>
            <h4 className="font-game text-xl text-white">
              {title}
            </h4>
            <p className="mt-2 font-game text-lg text-[#B8D0EB]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};