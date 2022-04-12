import './AuthPage.scss'
import React  from 'react'
import {Route, Routes } from 'react-router-dom'
import Login from '../../components/Login/Login'
import Registration from '../../components/Registration/Registration'

const AuthPage = () => {
    return (
        <div className="container">
            <div className="auth-page">
                <Routes>
                    <Route path='/login' element={<Login/>}/> 
                    <Route path='/registration' element={<Registration/>}/>
                </Routes>
            </div>
        </div>

    )
}

export default AuthPage;