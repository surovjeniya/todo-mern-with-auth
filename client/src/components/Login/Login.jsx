import axios from 'axios'
import React,{Fragment,useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {

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
            await axios.post('/api/auth/login',{...loginState},{
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => console.log(res))
        }catch(e) {
            console.log(e.message)
        }
    }

    return(
        <Fragment>
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
    </Fragment>
    )
}

export default Login