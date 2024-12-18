import React, { useState, useEffect } from 'react';
import { QuestJournal } from './QuestJournal';
import { ActiveQuestBar } from './ActiveQuestBar';
import { CenterNotification } from './CenterNotification';
import { useQuests } from '../../hooks/useQuests';
import { quests } from '../../data/quests';

type BarState = 'hide' | 'title' | 'full';

export const QuestManager: React.FC = () => {
  const { activeQuest, completedQuests, activateNextQuest } = useQuests(quests);
  const [isJournalVisible, setJournalVisible] = useState(false);
  const [barState, setBarState] = useState<BarState>('hide');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [autoShowJournal, setAutoShowJournal] = useState(false);
  const [questTransitioning, setQuestTransitioning] = useState(false);
  const [previousBarState, setPreviousBarState] = useState<BarState>('hide');

  useEffect(() => {
    if (isJournalVisible) {
      setPreviousBarState(barState);
      setBarState('hide');
    } else {
      // Restaure l'état précédent du panneau du bas
      const timer = setTimeout(() => {
        setBarState(previousBarState);
      }, 500); // Délai pour laisser le temps au panneau de droite de se fermer
      return () => clearTimeout(timer);
    }
  }, [isJournalVisible]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!activeQuest) {
          const nextQuest = quests.find(
            q => !completedQuests.includes(q.id) &&
                 q.prerequisites.every(p => completedQuests.includes(p))
          );
          if (nextQuest) {
            activateNextQuest();
            setBarState('title');
            setNotificationMessage(`Nouvelle quête lancée !\n${nextQuest.title}`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }
        } else if (!questTransitioning) {
          setQuestTransitioning(true);
          setAutoShowJournal(true);
          setNotificationMessage(`Quête accomplie !\n${activeQuest.title}`);
          setShowNotification(true);
          setPreviousBarState('hide');
          setBarState('hide');
          
          setTimeout(() => {
            activateNextQuest(true);
            setTimeout(() => {
              setShowNotification(false);
              setAutoShowJournal(false);
              setQuestTransitioning(false);
            }, 2000);
          }, 1000);
        }
      } else if (e.code === 'KeyC') {
        setJournalVisible(prev => !prev);
      } else if (e.code === 'KeyW' && activeQuest) {
        const newState = barState === 'full' ? 'title' : 'full';
        setPreviousBarState(newState);
        setBarState(newState);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeQuest, activateNextQuest, completedQuests, questTransitioning, barState]);

  useEffect(() => {
    if (!activeQuest && completedQuests.length === 0) {
      const firstQuest = quests[0];
      activateNextQuest();
      setBarState('title');
      setPreviousBarState('title');
      setNotificationMessage(`Nouvelle quête lancée !\n${firstQuest.title}`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, []);

  const handleQuestBarToggle = () => {
    if (activeQuest) {
      const newState = barState === 'full' ? 'title' : 'full';
      setPreviousBarState(newState);
      setBarState(newState);
    }
  };

  const handleJournalToggle = () => {
    if (!autoShowJournal) {
      setJournalVisible(prev => !prev);
    }
  };

  return (
    <>
      <QuestJournal
        quests={quests}
        activeQuest={activeQuest}
        completedQuests={completedQuests}
        isVisible={isJournalVisible || autoShowJournal}
        onToggleVisibility={handleJournalToggle}
      />

      <ActiveQuestBar
        quest={activeQuest}
        barState={barState}
        onToggleExpand={handleQuestBarToggle}
      />

      {showNotification && (
        <CenterNotification message={notificationMessage} />
      )}
    </>
  );
};