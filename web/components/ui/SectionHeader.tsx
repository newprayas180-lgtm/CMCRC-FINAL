import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
