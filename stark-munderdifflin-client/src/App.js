import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import AppNavbar from './components/AppNavbar';
<<<<<<< HEAD
import databaseConfig from './data/auth/apiKeys';
=======
import auth from './data/auth/firebaseConfig';
import userExistsInDB from './data/userData';
>>>>>>> d1ac635db9687eb7e23c568442b595f00ed4b3ff

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        userExistsInDB(authed.accessToken);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <AppNavbar user={user} />
      <Routes user={user} />
    </div>
  );
}

export default App;
