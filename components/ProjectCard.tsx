import React from 'react';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2 flex flex-col h-full">
      <img className="w-full h-48 object-cover" src={project.imageUrl} alt={project.title} />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-overlay text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;