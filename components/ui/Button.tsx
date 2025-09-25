
// Fix: Populating file with Button component implementation.
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, children, className = '' }) => {
  const baseClasses = "inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:-translate-y-0.5";

  if (to.startsWith('http') || to.startsWith('mailto')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
