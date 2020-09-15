import React from 'react';
import Nav from '../src/Components/Nav';
import routes from './routes';

import './App.css';

function App() {
  return (
    <div>
      <Nav />
      {routes}
    </div>
  );
}

export default App;
