import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Theme from './theme';
import './App.css';

function App() {
  return (
    <Router>
      <Theme>
        <Routes />
      </Theme>
    </Router>
  );
}

export default App;
