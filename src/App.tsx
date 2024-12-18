import React from 'react';
import { QuestManager } from './components/QuestSystem/QuestManager';

export const App: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'url(https://i.imgur.com/oooDGnL.jpg)',
      }}
    >
      <QuestManager />
      <div className="p-8">
        <h1 className="font-game text-4xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Formation Salomon
        </h1>
        <p className="mt-4 font-game text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Appuyez sur ESPACE pour continuer l'aventure ! 🎮
        </p>
      </div>
    </div>
  );
};

export default App;