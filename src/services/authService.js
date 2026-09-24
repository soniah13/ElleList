import { supabase } from '../lib/supabase';

export async function signUp(email, password) {
  return supabase.auth.signUp({ email: email.trim(), password });
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email: email.trim(), password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentSession() {
  return supabase.auth.getSession();
}

export function listenForAuthChanges(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

export function getAuthErrorMessage(error) {
  const message = error?.message?.toLowerCase() || '';

  if (message.includes('invalid login credentials')) {
    return 'The email or password is incorrect.';
  }

  if (message.includes('user already registered')) {
    return 'An account with this email already exists.';
  }

  if (message.includes('password')) {
    return 'Please choose a stronger password and try again.';
  }

  return 'We could not complete that request. Please try again.';
}