import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import AppNavbar from './components/AppNavbar';
import auth from './data/auth/firebaseConfig';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authed) => {
      if (authed) {
        console.log(authed);
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          user: authed.email.split('@')[0],
          accessToken: authed.accessToken,
        };
        setUser(userObj);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className='App'>
      <AppNavbar user={user} />
      <Routes />
    </div>
  );
}

export default App;
