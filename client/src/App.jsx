import React,{useState} from 'react'
import './App.scss'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {AuthContext} from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
import axios from 'axios';


function App() {

  const {login,logOut,token,userId,isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  const [todos,setTodos] = useState([])

  const updateTodos = async () => {
    try {
        const res = await axios.get('api/get-todo-list',{
          headers:{
            "Content-Type":"application/json"
          },
          params: {
            userId
          }
        })
        if(res.statusText === 'OK') {
            setTodos(res.data.todos)
        }
    } catch(e) {
        console.log(e)
    }
}



  

  const value = {
    login,logOut,token,userId,isReady,isLogin,todos,updateTodos,setTodos
  }
  
  
  

  return (
    <AuthContext.Provider value = {value}>
      <div className="App">
      <Router>
        <Navbar/>
        {routes}
      </Router>
    </div>
    </AuthContext.Provider>
  )
}

export default App;
