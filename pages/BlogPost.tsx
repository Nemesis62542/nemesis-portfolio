import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { motion } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts } = usePosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-accent hover:underline mt-4 inline-block">
          &larr; Back to Blog
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
      className="max-w-3xl mx-auto"
    >
      <article>
        <header className="mb-10 border-b border-overlay pb-8">
            <Link to="/blog" className="text-accent hover:text-accent-hover mb-6 inline-block">
            &larr; Back to all posts
            </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-text-secondary text-lg">{post.date}</p>
        </header>
        
        <MarkdownRenderer content={post.content} />
      
      </article>
    </motion.div>
  );
};

export default BlogPost;