import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/Navbar';
import Dashboard from './layouts/Dashboard';
import { useUserStore } from './store/useUserStore';

function App() {
  const {login} = useUserStore()
  if(login){
    return(    
    <div className="App">
    <Navbar/>
    <Dashboard/>
        </div>)
  }else{
  return (
    <div className="App">
    <Dashboard/>
        </div>
  )
}
}

export default App;
