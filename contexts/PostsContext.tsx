import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Post } from '../types';
import { posts as defaultPosts } from '../data/posts';

interface PostsContextType {
  posts: Post[];
  updatePost: (updatedPost: Post) => void;
  addPost: (newPost: Post) => void;
  resetPosts: () => void;
  deletePost: (postId: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const POSTS_STORAGE_KEY = 'portfolio_posts';

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
        setPosts(defaultPosts);
      }
    } catch (error) {
      console.error("Failed to load posts from local storage", error);
      setPosts(defaultPosts);
    }
  }, []);

  const persistPosts = (newPosts: Post[]) => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const updatePost = (updatedPost: Post) => {
    const newPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    persistPosts(newPosts);
  };

  const addPost = (newPost: Post) => {
    const newPosts = [...posts, newPost];
    persistPosts(newPosts);
  };
  
  const deletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const newPosts = posts.filter(p => p.id !== postId);
      persistPosts(newPosts);
    }
  };

  const resetPosts = () => {
    if(window.confirm('Are you sure you want to reset all blog posts to their default state? This action cannot be undone.')) {
        localStorage.removeItem(POSTS_STORAGE_KEY);
        setPosts(defaultPosts);
        window.location.reload(); // To ensure all components re-fetch the default state
    }
  };

  return (
    <PostsContext.Provider value={{ posts, updatePost, addPost, resetPosts, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};