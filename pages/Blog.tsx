import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const Blog: React.FC = () => {
  const { posts } = usePosts();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-white text-center mb-12">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Link to={`/blog/${post.id}`} className="block p-6 bg-surface rounded-lg shadow-lg hover:bg-overlay transition-colors duration-200">
              <p className="text-sm text-text-secondary mb-1">{post.date}</p>
              <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
              <p className="text-text-primary">{post.excerpt}</p>
              <span className="text-accent hover:text-accent-hover font-semibold mt-4 inline-block">
                Read more &rarr;
              </span>
            </Link>
          </motion.div>
        ))}
        {posts.length === 0 && <p className="text-center text-text-secondary">No blog posts found.</p>}
      </div>
    </motion.div>
  );
};

export default Blog;