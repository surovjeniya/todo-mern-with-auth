import axios from 'axios'
import React,{useState,useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom'
import './Login.scss'

const Login = () => {

    const {login} = useContext(AuthContext)

    const [loginState,setLoginState] = useState({
        email:'',
        password:''
    })

    const onSubmitHanlder = (e) => {
        e.preventDefault()
    }

    const onChangeHanlder = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]:e.target.value
        })
    }

    const loginHandler = async () => {
        try {
            const res = await axios.post('/api/auth/login',{...loginState},{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            if(res.statusText === 'OK') {
                console.log(res.data)
                login(res.data.token,res.data.userId)
            }

        }catch(e) {
            console.log(e.message)
        }
    }

    return(
        <div className='login-page container'>
        <h3 className="auth-page__title">Authorization</h3>
        <form 
            onSubmit={onSubmitHanlder}
            className='auth-page__form form form-login'>
            <div className="row">
                <div className="input-field col s12">
                    <input
                        onChange = {onChangeHanlder}
                        name="email"
                        placeholder='Email...'
                        className='validate'
                        type="email" />
                </div>
                <div className="input-field col s12">
                    <input
                        onChange={onChangeHanlder}
                        placeholder='Password...'
                        name="password"
                        className='validate'
                        type="password" />
                </div>
            </div>
            <div className="row">
                <button 
                    onClick = {loginHandler}
                    className='btn blue'>
                    Log In
                </button>
                <Link to='/registration' className='btn-outline havent-link'>Havent't account?</Link>
            </div>
        </form>
        </div>
    )
}

export default Login