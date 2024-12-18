import React, { useState, useEffect } from 'react';
import { Scroll } from 'lucide-react';
import { QuestList } from './QuestList';
import { QuestNotification } from './QuestNotification';
import { quests } from '../../data/quests';
import { useQuests } from '../../hooks/useQuests';
import { colors } from '../../styles/theme';
import '../../styles/animations.css';

export const QuestPanel: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { activeQuest, completedQuests, activateNextQuest, notification, dismissNotification } = useQuests(quests);

  useEffect(() => {
    if (notification) {
      setIsPanelOpen(true);
      const timer = setTimeout(() => {
        if (!isPanelHovered) {
          setIsPanelOpen(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const [isPanelHovered, setIsPanelHovered] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPanelOpen(true);
        if (notification) {
          dismissNotification();
        } else if (!activeQuest) {
          activateNextQuest();
        } else {
          activateNextQuest(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeQuest, activateNextQuest, notification, dismissNotification]);

  return (
    <>
      <div 
        className="fixed right-0 top-0 h-full"
        onMouseEnter={() => {
          setIsPanelHovered(true);
          setIsPanelOpen(true);
        }}
        onMouseLeave={() => {
          setIsPanelHovered(false);
          if (!notification) {
            setIsPanelOpen(false);
          }
        }}
      >
        <div 
          className={`fixed right-0 top-1/2 z-10 -translate-y-1/2 transition-all duration-500 ${
            isPanelOpen ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-l-xl bg-[${colors.secondary}] shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[${colors.tertiary}]`}>
            <Scroll className="text-white" size={24} />
          </div>
        </div>
        
        <div
          className={`relative flex h-full w-96 transform transition-transform duration-500 ease-out ${
            isPanelOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full w-full border-l-4 border-[#FFE66D] bg-[#2A3F54]/90 p-6 shadow-[-4px_0_12px_rgba(0,0,0,0.2)]">
            <div className="mb-6 flex items-center justify-between">
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

      {notification && (
        <QuestNotification 
          notification={notification} 
          onDismiss={dismissNotification}
        />
      )}
    </>
  );
};