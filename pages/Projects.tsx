
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../contexts/ProjectsContext';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Projects: React.FC = () => {
  const { projects } = useProjects();
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
    >
      <h1 className="text-4xl font-bold text-white text-center mb-12">Projects</h1>
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <Link to={`/projects/${project.id}`} className="block h-full">
              <ProjectCard project={project} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;