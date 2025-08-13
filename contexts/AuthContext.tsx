
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Helper Functions for Crypto ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Context Definition ---

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'portfolio_auth';
const PASSWORD_HASH_KEY = 'portfolio_password_hash';
const DEFAULT_PASSWORD = 'admin'; // Only used for the very first setup

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default password hash if it doesn't exist
    const initializePassword = async () => {
      if (!localStorage.getItem(PASSWORD_HASH_KEY)) {
        const defaultHash = await hashPassword(DEFAULT_PASSWORD);
        localStorage.setItem(PASSWORD_HASH_KEY, defaultHash);
      }
    };
    initializePassword();
  }, []);
  
  const login = async (password: string): Promise<boolean> => {
    const storedHash = localStorage.getItem(PASSWORD_HASH_KEY);
    if (!storedHash) {
        // This should not happen if initialization is correct
        throw new Error("Password has not been set up.");
    }
    const inputHash = await hashPassword(password);
    if (inputHash === storedHash) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const storedHash = localStorage.getItem(PASSWORD_HASH_KEY);
    if (!storedHash) {
        throw new Error("Cannot change password, initial setup not found.");
    }
    const currentHash = await hashPassword(currentPassword);
    if (currentHash !== storedHash) {
        throw new Error("Current password is not correct.");
    }
    const newHash = await hashPassword(newPassword);
    localStorage.setItem(PASSWORD_HASH_KEY, newHash);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
