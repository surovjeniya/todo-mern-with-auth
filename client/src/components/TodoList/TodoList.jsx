import React,{Fragment,useEffect,useContext} from 'react'
import './TodoList.scss';
import { TodoItem } from '../TodoItem/TodoItem';
import { AuthContext } from '../../context/AuthContext';


export const TodoList = () => {

    const {todos,updateTodos} = useContext(AuthContext)

    useEffect(() => {
        updateTodos()
    },[])

    return (
        <Fragment>
            <h4 className="todo-list__title">
                Todo List
            </h4>
            <ul className="todo-list">
                {todos.length ? todos.map((item,index) => (
                    <li key={item._id}><TodoItem data={item} idx={index}/></li>
                )) : <p>Havent't todos</p>}
            </ul>
            
        </Fragment>
    )
}