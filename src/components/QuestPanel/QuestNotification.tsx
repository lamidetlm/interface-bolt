import React from 'react';
import { QuestNotificationType } from '../../types/quest';
import { Star, Sparkles } from 'lucide-react';
import { colors } from '../../styles/theme';

interface QuestNotificationProps {
  notification: QuestNotificationType;
  onDismiss: () => void;
}

export const QuestNotification: React.FC<QuestNotificationProps> = ({ notification, onDismiss }) => {
  const isCompletion = notification.type === 'completion';
  
  return (
    <div className="fixed bottom-8 left-8 z-50 max-w-[66%]">
      <div 
        className="animate-slideUp cursor-pointer"
        onClick={onDismiss}
      >
        <div className="relative rounded-lg border-2 border-[#FFE66D] bg-[#2A3F54] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <div className="absolute -right-2 -top-2">
            <div className="rounded-lg bg-[#456990] p-2 text-xs text-white">
              Cliquez ou Espace pour continuer
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isCompletion ? (
              <div className="rounded-full bg-[#44CF6C] p-2">
                <Star className="text-white" size={24} />
              </div>
            ) : (
              <div className="rounded-full bg-[#FFB320] p-2">
                <Sparkles className="text-white" size={24} />
              </div>
            )}
            <h4 className="font-game text-2xl text-white">
              {isCompletion ? '✨ Quête accomplie !' : '🎈 Nouvelle quête lancée !'}
            </h4>
          </div>
          <p className="mt-4 font-game text-[#B8D0EB] whitespace-pre-wrap">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};