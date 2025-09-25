
import React from 'react';
import { Publication } from '../../types';

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-blue-600">
      <div className="flex flex-col justify-between h-full">
          <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{publication.title}</h3>
              <p className="text-slate-500 text-sm mb-3 italic">
                  {publication.authors.join(', ')}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                  Published in <span className="text-blue-600">{publication.journal}</span>, {publication.year}
              </p>
          </div>
          <div className="mt-4">
              <a 
                  href={publication.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link"
              >
                  Read More <span className="inline-block transition-transform group-hover/link:translate-x-1">&rarr;</span>
              </a>
          </div>
      </div>
  </div>
);

export default PublicationCard;
