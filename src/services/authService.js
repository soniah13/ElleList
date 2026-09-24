import { supabase } from '../lib/supabase';

export async function signUp(username, email, password) {
  return supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { username: username.trim().toLowerCase() } },
  });
}

export async function signIn(identifier, password) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedIdentifier);
  let email = normalizedIdentifier;

  if (!isEmail) {
    const { data: usernameEmail, error: lookupError } = await supabase.rpc('get_email_by_username', {
      input_username: normalizedIdentifier,
    });

    if (lookupError || !usernameEmail) {
      return { data: { user: null, session: null }, error: { message: 'Invalid login credentials' } };
    }

    email = usernameEmail;
  }

  return supabase.auth.signInWithPassword({ email, password });
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

  if (error?.status === 429 || message.includes('too many') || message.includes('rate limit')) {
    return 'Too many account attempts. Please wait before trying again.';
  }

  if (message.includes('invalid login credentials')) {
    return 'The username/email or password is incorrect.';
  }

  if (message.includes('email not confirmed')) {
    return 'Confirm your email address before signing in.';
  }

  if (message.includes('user already registered')) {
    return 'An account with this email already exists.';
  }

  if (message.includes('duplicate key') || message.includes('username')) {
    return 'That username is already taken or is not valid.';
  }

  if (message.includes('password')) {
    return 'Please choose a stronger password and try again.';
  }

  return 'We could not complete that request. Please try again.';
}