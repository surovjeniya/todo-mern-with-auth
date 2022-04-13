import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import MainPage from './pages/Mainpage/Mainpage'

export const useRoutes = (isLogin) => {
    if(isLogin) {
        return (
            <Routes>
                <Route path = '/' exact element={<MainPage/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path = '/login' exact element={<Login/>}/>
            <Route path = '/registration' exact element={<Registration/>}/>
            <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            <Route
                    path="*"
                    element={<Navigate to="/registration" replace />}
                />
        </Routes>
    )
}