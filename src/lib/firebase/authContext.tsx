'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInAnonymously,
  updateProfile,
  User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: User | MockUser | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  signInGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isConfigured: false,
  signIn: async () => {},
  signUp: async () => {},
  signInGuest: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | MockUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Offline/Local mock user check
      const stored = typeof window !== 'undefined' ? localStorage.getItem('luscious_mock_user') : null;
      if (stored) {
        setUser(JSON.parse(stored) as MockUser);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      const mock: MockUser = {
        uid: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        displayName: email.split('@')[0],
      };
      localStorage.setItem('luscious_mock_user', JSON.stringify(mock));
      setUser(mock);
    }
  };

  const signUp = async (email: string, pass: string, name: string) => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
      }
    } else {
      const mock: MockUser = {
        uid: 'user_' + Math.random().toString(36).substring(2, 9),
        email,
        displayName: name || email.split('@')[0],
      };
      localStorage.setItem('luscious_mock_user', JSON.stringify(mock));
      setUser(mock);
    }
  };

  const signInGuest = async () => {
    if (isFirebaseConfigured && auth) {
      await signInAnonymously(auth);
    } else {
      const mock: MockUser = {
        uid: 'guest_' + Math.random().toString(36).substring(2, 9),
        email: 'guest@luscious.catering',
        displayName: 'Guest Connoisseur',
        isAnonymous: true,
      };
      localStorage.setItem('luscious_mock_user', JSON.stringify(mock));
      setUser(mock);
    }
  };

  const logout = async () => {
    if (auth) {
      await signOut(auth);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('luscious_mock_user');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isConfigured: isFirebaseConfigured, signIn, signUp, signInGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
