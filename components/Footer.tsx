import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface mt-auto border-t-2 border-overlay">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4 text-center">
        <div className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Nemesis. All Rights Reserved.
        </div>
        
        <div className="text-sm text-muted">
          Built with <span className="text-accent font-semibold">React</span> &amp; <span className="text-accent font-semibold">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;