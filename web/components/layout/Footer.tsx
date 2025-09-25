import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors">
      <span className="sr-only">Social Media</span>
      {children}
    </a>
  );

  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">CMCRC</h2>
            <p className="text-slate-600">
              Chittagong Medical College Research Club. Fostering a culture of research and innovation among future medical professionals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-base text-slate-600 hover:text-blue-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 tracking-wider uppercase">Contact Us</h3>
            <div className="mt-4 space-y-2 text-slate-600">
                <p>Chittagong Medical College</p>
                <p>Chattogram, Bangladesh</p>
                <p>Email: contact@cmcrc.org</p>
            </div>
          </div>
          <div>
             <h3 className="text-lg font-semibold text-slate-800 tracking-wider uppercase">Follow Us</h3>
             <div className="mt-4 flex space-x-6">
                <SocialIcon href="#">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>
             </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-300 pt-8 text-center">
          <p className="text-base text-slate-500">&copy; {new Date().getFullYear()} CMCRC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
