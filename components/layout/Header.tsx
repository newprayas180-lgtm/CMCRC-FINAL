
// Fix: Populating file with Header component implementation.
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const location = useLocation();
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us',
      subLinks: [
        { name: 'Who We Are', path: '/about' },
        { name: 'Our Team', path: '/about/our-team' },
      ]
    },
    { name: 'Events', path: '/events' },
    { name: 'Publications & Achievements', path: '/publications' },
    { name: 'Membership', path: '/membership' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const linkClasses = "text-slate-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md font-medium";
  const activeLinkClasses = "text-blue-600 bg-blue-50";

  const isAboutActive = location.pathname.startsWith('/about');
  const isPublicationsActive = location.pathname.startsWith('/publications') || location.pathname.startsWith('/achievements');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-slate-800">
              CMCRC
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                link.subLinks ? (
                  <div 
                    key={link.name}
                    className="relative"
                    ref={aboutDropdownRef}
                  >
                    <button 
                      onClick={() => setIsAboutDropdownOpen(prev => !prev)}
                      className={`${linkClasses} ${isAboutActive ? activeLinkClasses : ''} flex items-center`}
                    >
                      {link.name}
                      <svg className={`w-4 h-4 ml-1 transition-transform ${isAboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isAboutDropdownOpen && (
                      <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        {link.subLinks.map(subLink => (
                           <NavLink
                            key={subLink.name}
                            to={subLink.path}
                            onClick={() => setIsAboutDropdownOpen(false)}
                            className={({ isActive }) => `block w-full text-left px-4 py-2 text-sm ${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                          >
                            {subLink.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path!}
                    className={({ isActive }) => {
                       const active = (link.name === 'Publications & Achievements' && isPublicationsActive) || isActive;
                       return `${linkClasses} ${active ? activeLinkClasses : ''}`;
                    }}
                  >
                    {link.name}
                  </NavLink>
                )
              ))}
            </nav>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.name}>
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-slate-500">{link.name}</span>
                  <div className="pl-4">
                    {link.subLinks.map(subLink => (
                        <NavLink
                          key={subLink.name}
                          to={subLink.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${linkClasses} ${isActive ? activeLinkClasses : ''}`
                          }
                        >
                          {subLink.name}
                        </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${linkClasses} ${isActive ? activeLinkClasses : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
