import React, { useState, useEffect } from 'react';
import Routes from './routes/index';
import AppNavbar from './components/AppNavbar';
import databaseConfig from './data/auth/apiKeys';

function App() {
  return (
    <div className='App'>
      <AppNavbar />
      <Routes />
    </div>
  );
}

export default App;
