'use client';

import React from 'react';
import { AuthProvider } from '../../lib/firebase/authContext';
import { SmoothScrollProvider } from './SmoothScrollProvider';

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </AuthProvider>
  );
};
