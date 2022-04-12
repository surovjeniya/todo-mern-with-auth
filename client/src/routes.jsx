import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Mainpage from './pages/Mainpage/Mainpage'
import AuthPage from './pages/AuthPage/AuthPage'
import Login from './components/Login/Login'


export const useRoutes = (isLogin) => {
    if(isLogin) {
        return(
            <Routes>
                <Route path='/' exact element={<Mainpage/>}/>
                <Route path='*' element={<Navigate to='/' replace/>}/>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='*' element={<Navigate to='/login' replace/>}/>
            </Routes>
        )
    }
}

export default useRoutes