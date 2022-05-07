import React from 'react';
import { signOutUser } from '../data/auth/firebaseSignInOut';

export default function SignOutButton() {
  return <button onClick={signOutUser}>SignOutButton</button>;
}
