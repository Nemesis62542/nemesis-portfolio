
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Secure Crypto Configuration ---

const SALT = 'xK9mP2vQ8nR5wE7tZ3cF6hJ8kL1nM4pR';
const ITERATIONS = 10000;

// Secure PBKDF2 hash function
async function secureHashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const saltData = encoder.encode(SALT);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordData,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltData,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string): Promise<string> {
  return secureHashPassword(password);
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'portfolio_auth';
const PASSWORD_HASH = '8fd86a493750529e206034bd17121cbbe1aa98f6c1c10330b02f51081e66e3bb';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const navigate = useNavigate();
  
  const login = async (password: string): Promise<boolean> => {
    const inputHash = await secureHashPassword(password);
    if (inputHash === PASSWORD_HASH) {
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
    const currentHash = await secureHashPassword(currentPassword);
    if (currentHash !== PASSWORD_HASH) {
        throw new Error("Current password is not correct.");
    }

    const newHash = await secureHashPassword(newPassword);

    const message = `
パスワード変更のために以下のステップを実行してください:

1. contexts/AuthContext.tsx ファイルを開く
2. 58行目の PASSWORD_HASH の値を以下に変更:
   '${newHash}'
3. ファイルを保存してアプリケーションを再デプロイ

新しいパスワードのハッシュ値: ${newHash}
    `.trim();
    
    throw new Error(message);
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
