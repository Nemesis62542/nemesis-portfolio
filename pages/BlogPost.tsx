
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '../contexts/PostsContext';
import { motion } from 'framer-motion';

// A simple markdown-to-html renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const htmlContent = content
        .split('\n')
        .map((line, index) => {
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{line.substring(3)}</h2>;
            }
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">{line.substring(4)}</h3>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
            }
            if (line.startsWith('```')) {
                const codeBlockContent = content.split('```')[1] || '';
                // Simple highlighter for C# keywords
                const highlightedCode = codeBlockContent.replace(/\b(void|int|for|if|new|public|private|class)\b/g, '<span class="text-cyan-400">$&</span>');
                return (
                    <pre key={index} className="bg-overlay p-4 rounded-md my-4 overflow-x-auto">
                        <code className="font-mono text-sm text-subtle" dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
                    </pre>
                );
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="my-4 text-lg leading-relaxed">{line}</p>;
        })
        // Filter out code blocks from regular paragraph processing
        .filter((_, index, arr) => {
             const line = content.split('\n')[index];
             if (line.includes('```')) return false;
             if (content.split('```').length > 1 && content.split('\n').slice(index).join('\n').startsWith(content.split('```')[1])) return false;
             return true;
        });

    return <>{htmlContent}</>;
};


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
      <article className="prose prose-invert lg:prose-xl max-w-none 
                        prose-headings:text-white prose-p:text-text-primary prose-a:text-accent 
                        prose-strong:text-white prose-blockquote:text-text-secondary
                        prose-code:bg-overlay prose-code:text-accent prose-code:p-1 prose-code:rounded-md">
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