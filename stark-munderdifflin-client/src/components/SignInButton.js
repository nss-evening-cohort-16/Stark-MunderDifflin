import React from 'react';
import { signInUser } from '../data/auth/firebaseSignInOut';

export default function SignInButton() {
  return <button onClick={signInUser}>SignInButton</button>;
}
