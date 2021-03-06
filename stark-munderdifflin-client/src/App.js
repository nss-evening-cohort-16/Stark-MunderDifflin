import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import AppNavbar from './components/AppNavbar';
import auth from './data/auth/firebaseConfig';
import { userExistsInDB } from './data/userData';
import { useNavigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const isAdmin = await authed
          .getIdTokenResult()
          .then((idTokenResult) => idTokenResult.claims.admin);
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
          isAdmin,
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        userExistsInDB(authed.accessToken);
      } else if (user || user === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='App'>
      <AppNavbar user={user} />
      <div className='main-container'>
        <Routes user={user} />
      </div>
    </div>
  );
}

export default App;
