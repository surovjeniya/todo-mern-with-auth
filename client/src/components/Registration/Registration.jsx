import React,{Fragment,useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Registration.scss'
import {useNavigate} from 'react-router-dom'




const Registration = () => {

    const navigate = useNavigate()
    const [registrationState,setRegistrationState] = useState({
        email:'',
        password:'',
        confirmPassword:''
    })

    const registerHandler = async () => {
        try {
            const res = await axios.post('/api/auth/registration',{
                ...registrationState
            },
            {
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            )
            if(res.statusText === 'Created') {
                return navigate('/login')
            }
            console.log(res)
        } catch(e) {
            console.log(e.message)
        }
    }

    const onSubmitHanlder = (e) => {
        e.preventDefault()
    }

    const onChangeHanlder = (e) => {
        setRegistrationState({
            ...registrationState,
            [e.target.name]:e.target.value
        })
    }

    

    return (
        <div className="register-page">
            <h3 className="auth-page__title">Registration</h3>
            <form
                onSubmit={onSubmitHanlder}
                className='auth-page__form form form-login'>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            onChange={onChangeHanlder}
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
                    <div className="input-field col s12">
                        <input
                            onChange={onChangeHanlder}
                            placeholder='Confirm password...'
                            name="confirmPassword"
                            className='validate'
                            type="password" />
                    </div>
                </div>
                <div className="row">
                    <button
                        onClick={registerHandler}
                        className='btn blue'>
                        Register
                    </button>
                    <Link to='/login' className='btn-outline havent-link'>You have account?</Link>
                </div>
            </form>
            </div>
    )
}
export default Registration