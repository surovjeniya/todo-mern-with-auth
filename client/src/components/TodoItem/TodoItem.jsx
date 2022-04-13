import './TodoItem.scss'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const TodoItem = ({data,idx}) => {

    const {updateTodos} = useContext(AuthContext)

    const onDeleteHandler = async (id) => {
        try {
            await axios.delete(`/api/delete-todo/${id}`,{
                headers: {
                    "Content-Type":'application/json'
                }
            })
            updateTodos()
        } catch(e) {
            console.log(e)
        }
    }

    const onDoneHandler = async (id) => {
        try {
            await axios.put(`/api/done-todo/${id}`,{
                headers: {
                    "Content-Type":'application/json'
                }
            })
            updateTodos()
        } catch(e) {
            console.log(e)
        }
    }

    const onImportantHandler = async (id) => {
        try {
            await axios.put(`/api/important-todo/${id}`,{
                headers: {
                    "Content-Type":'application/json'
                }
            })
            updateTodos()
        } catch(e) {
            console.log(e)
        }
    }

    const doneClass = data.done ? ' done' : '' 
    const importantClass = data.important ? ' important' : ''
    const classList = 'todo-item__title' + doneClass + importantClass


    return (
        <div className="todo-item">
            <span>{idx+1}.</span>
            <span className={classList}>
                {data.title}
            </span>
            <span className="todo-item__author">
                Author
            </span>
            <div className="todo-item__buttons">
                <button
                    onClick = {() => onDoneHandler(data._id)}
                    className = 'btn green'
                >
                    <i className="material-icons">check</i>
                </button>
                <button
                    onClick = {() => onImportantHandler(data._id)}
                    className = 'btn blue'
                >
                    <i className="material-icons">star</i>
                </button>
                <button
                    className='btn red'
                    onClick = {() => onDeleteHandler(data._id)}
                >
                    <i className="material-icons">delete</i>
                </button>
            </div>
        </div>
    )
}