
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../contexts/ProjectsContext';

const backgroundImages = [
  'assets/Tuna.png',
  'assets/Cat.png',
  'assets/Blue.png',
];

const Home: React.FC = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-center text-center py-32 md:py-48 overflow-hidden rounded-lg"
      >
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Nemesis
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-text-secondary mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            C#とUnityを軸に活動するゲームデベロッパー
          </motion.p>
          <motion.p 
            className="text-lg text-text-primary max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            アイデアを形にし、最高のゲーム体験を創り出すことに情熱を注いでいます。
            企画から実装、リリースまで、一貫した開発経験が強みです。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              to="/projects"
              className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-colors duration-300 shadow-lg"
            >
              制作実績を見る
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="mt-12 md:mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">代表作品</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="group relative block bg-surface rounded-lg overflow-hidden shadow-lg h-64 md:h-80 transform transition-transform duration-300 hover:-translate-y-2">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">{project.title}</h3>
                    <p className="text-text-secondary mt-1">{project.tags.slice(0, 3).join(' / ')}</p>
                </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Home;