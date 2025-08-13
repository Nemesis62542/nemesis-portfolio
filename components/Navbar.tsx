
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  const activeClass = 'bg-accent text-white';
  const inactiveClass = 'text-text-secondary hover:bg-surface hover:text-white';

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
      }
    >
      {children}
    </NavLink>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <Code className="h-8 w-8 text-accent" />
              <span className="text-white font-bold text-xl">Nemesis</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/projects">Projects</NavItem>
              <NavItem to="/blog">Blog</NavItem>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-surface inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-white hover:bg-overlay focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
            <NavItem to="/about" onClick={() => setIsOpen(false)}>About</NavItem>
            <NavItem to="/projects" onClick={() => setIsOpen(false)}>Projects</NavItem>
            <NavItem to="/blog" onClick={() => setIsOpen(false)}>Blog</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};

// Mock lucide-react icons for environments without it
if (typeof Menu === 'undefined') {
    (window as any).Menu = () => <svg/>;
    (window as any).X = () => <svg/>;
    (window as any).Code = () => <svg/>;
}

export default Navbar;