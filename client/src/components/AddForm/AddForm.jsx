import './AddForm.scss'
import {useState,useContext} from 'react'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext.js'

export const AddForm = () => {

    const {userId,updateTodos} = useContext(AuthContext)
    const [title,setTitle] = useState({
        title:''
    })


    const onChangeHandler = (e) => {
        setTitle({...title,[e.target.name] : e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
    }

    const onAddHandler = async() => {
        try {
            const res = await axios.post('/api/add-todo',{
                ...title,userId
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            updateTodos()
            setTitle({
                title:''
            })
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <form 
            onSubmit = {onSubmitHandler}
            className="add-form">
            <div className="row">
                <div className="input-field col s12">
                    <input
                        onChange = {onChangeHandler}
                        value = {title.title}
                        name="title"
                        placeholder='Title...'
                        className='validate'
                        type="text" />
                </div>
            </div>
            <div className="row">
                <button 
                    disabled = {!title.title.trim().length}
                    onClick = {onAddHandler}
                    className='btn blue'>
                    Add
                </button>
            </div>
        </form>
    )
}