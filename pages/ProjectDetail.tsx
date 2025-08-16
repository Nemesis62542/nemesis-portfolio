import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../contexts/ProjectsContext';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import MediaSlider from '../components/MediaSlider';
import { MediaItem } from '../types';

const ProjectDetail: React.FC = () => {
  const { projects } = useProjects();
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [projectId]);

  // メディア配列を生成（画像と動画を統合）
  const getProjectMedia = (): MediaItem[] => {
    if (!project) return [];
    
    const media: MediaItem[] = [];
    
    // 複数画像を追加
    if (project.images && project.images.length > 0) {
      project.images.forEach(url => {
        media.push({ type: 'image', url });
      });
    } else if (project.imageUrl) {
      // 後方互換性: 単一画像の場合
      media.push({ type: 'image', url: project.imageUrl });
    }
    
    // 動画を追加
    if (project.videos && project.videos.length > 0) {
      project.videos.forEach(url => {
        media.push({ type: 'video', url });
      });
    }
    
    return media;
  };

  if (!project) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link to="/projects" className="text-accent hover:underline mt-4 inline-block">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <header className="mb-8">
        <Link to="/projects" className="text-text-secondary hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 mb-4">
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{project.title}</h1>
      </header>

      <motion.div 
        className="mb-8 shadow-2xl rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <MediaSlider media={getProjectMedia()} className="w-full" />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <MarkdownRenderer content={project.description} />
        </div>

        <div className="md:col-span-1">
          <div className="bg-surface p-6 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-overlay text-accent text-sm font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Links</h3>
            <div className="flex flex-col gap-3">
              {project.links && project.links.length > 0 ? (
                project.links.map((link, index) => {
                  const Icon = link.label.toLowerCase().includes('source') || link.label.toLowerCase().includes('github')
                    ? Github
                    : ExternalLink;
                  
                  return (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-accent text-white font-bold py-2 px-4 rounded-lg text-base hover:bg-accent-hover transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Icon size={18} />
                      <span>{link.label}</span>
                    </a>
                  );
                })
              ) : (
                <p className="text-text-secondary text-sm">No links available for this project.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Mock lucide-react icons
if (typeof ExternalLink === 'undefined') {
    (window as any).ExternalLink = () => <svg/>;
    (window as any).Github = () => <svg/>;
    (window as any).ArrowLeft = () => <svg/>;
}

export default ProjectDetail;