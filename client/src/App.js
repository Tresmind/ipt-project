import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Sell from './components/Sell';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Routes from './components/Routes';


function App() {
  return (
    <Router>
    <div className="App">
      {/* <Home /> */}
       {/* <Details />  */}
        {/* <Sell />  */}
        
        <Routes />
        
    </div>
    </Router>
  );
}

export default App;
