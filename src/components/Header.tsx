
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Chat', path: '/chat' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-mindful-600 rounded-full opacity-70 animate-pulse" />
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <span className="block w-4 h-4 bg-mindful-500 rounded-full" />
            </div>
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-mindful-700 to-calm-500">
            Mindful
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-mindful-600',
                  isActive
                    ? 'text-mindful-600'
                    : 'text-neutral-600 hover:text-mindful-600'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md animate-fade-in">
            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'text-xl font-medium transition-colors button-transition',
                      isActive
                        ? 'text-mindful-600'
                        : 'text-neutral-600 hover:text-mindful-600'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
