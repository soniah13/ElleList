import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  getCurrentSession,
  listenForAuthChanges,
  signIn,
  signOut,
  signUp,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentSession()
      .then(({ data }) => {
        if (active) {
          setSession(data.session);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    const { data } = listenForAuthChanges((_event, nextSession) => {
      if (active) {
        setSession(nextSession);
        setLoading(false);
      }
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      loading,
      signUp,
      signIn,
      signOut,
    }),
    [loading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}