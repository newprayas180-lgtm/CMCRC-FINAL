import React from 'react';
import { Event, EventStatus } from '../../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1 w-full max-w-md">
      <div className="relative">
        <img className="h-64 w-full object-cover" src={event.imageUrl} alt={event.title} />
        <div className="absolute top-0 right-0 mt-4 mr-4 px-3 py-1 text-sm font-semibold rounded-full bg-white/80 backdrop-blur-sm text-slate-800 shadow-sm">
          {event.date}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3>
        <p className="text-slate-600 mb-4 flex-grow">{event.description}</p>
        <div className="mt-auto">
            {event.status === EventStatus.Upcoming && (
                <div className="mb-4">
                     <a 
                        href="#" 
                        className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:-translate-y-0.5"
                    >
                        Register
                    </a>
                </div>
            )}
            <div className="text-sm text-slate-500 space-y-2">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                     <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{event.location}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
