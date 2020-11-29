import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Currencies from './Currencies';
import Calculator from './Calculator';
import './styles/styles.css';
import './styles/custom.css';


function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Calculator />
      </Route>
      <Route path="/currencies">
        <Currencies />
      </Route>
    </BrowserRouter>
  );
}

export default App;
