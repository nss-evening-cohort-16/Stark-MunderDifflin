import React from 'react'
import Routes from './routes/index'
import AppNavbar from '../components/AppNavbar';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Routes />
    </div>
  );
}

export default App;
