
import React from 'react';
import { Achievement } from '../../types';

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
      <img className="h-56 w-full object-cover" src={achievement.imageUrl} alt={achievement.title} />
      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600 mb-1">{achievement.date}</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{achievement.title}</h3>
        <p className="text-slate-600">{achievement.description}</p>
      </div>
    </div>
  );
};

export default AchievementCard;
