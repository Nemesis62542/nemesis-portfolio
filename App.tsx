
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { PostsProvider } from './contexts/PostsContext';
import { AuthProvider } from './contexts/AuthContext';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ProjectsProvider>
          <PostsProvider>
            <div className="flex flex-col min-h-screen bg-base text-text-primary">
              <Navbar />
              <main className="flex-grow max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                 <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </PostsProvider>
        </ProjectsProvider>
      </AuthProvider>
    </HashRouter>
  );
};

// Mocking framer-motion for compatibility in environments where it might not be pre-installed.
// In a real project, you would `npm install framer-motion`.
const motionMock = {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>
};
if (typeof motion === 'undefined') {
    (window as any).motion = motionMock;
    (window as any).AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
}


export default App;