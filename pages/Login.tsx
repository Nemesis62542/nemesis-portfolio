
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
      }
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-xl shadow-2xl">
        <div className="text-center">
            <KeyRound className="mx-auto h-12 w-12 text-accent" />
            <h1 className="text-3xl font-bold text-white mt-4">Admin Access</h1>
            <p className="text-text-secondary mt-2">Please enter the password to manage content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-overlay border-2 border-transparent rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover transition-colors"
            >
              Unlock
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// Mock lucide-react icons
if (typeof KeyRound === 'undefined') {
    (window as any).KeyRound = () => <svg/>;
}


export default Login;