
import React from 'react';
import PageWrapper from '../layout/PageWrapper';
import SectionHeader from '../ui/SectionHeader';
import { MOCK_RESOURCES } from '../../constants';
import { Resource } from '../../types';

const ResourceItem: React.FC<{ resource: Resource }> = ({ resource }) => (
  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform">
    <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
            {resource.type === 'Download' ? (
                 <svg className="h-10 w-10 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                 </svg>
            ) : (
                <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
            )}
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800">{resource.title}</h3>
            <p className="text-slate-600">{resource.description}</p>
        </div>
    </div>
  </a>
);

const ResourcesPage: React.FC = () => {
  // CMS: This data would be fetched from the 'Resources' collection.
  return (
    <PageWrapper>
      <SectionHeader title="Knowledge Hub" subtitle="Tools & Materials" />

      <div className="max-w-4xl mx-auto space-y-6">
        {MOCK_RESOURCES.map(resource => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ResourcesPage;
