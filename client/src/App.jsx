import React from 'react'
import './App.scss'
import Navbar from './components/Navbar/Navbar';
import AuthPage from './pages/AuthPage/AuthPage';
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes';


function App() {

  const content = useRoutes()

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AuthPage/>
        {content}
      </Router>
    </div>
    
  );
}

export default App;
