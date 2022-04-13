import './Mainpage.scss'
import { AddForm } from '../../components/AddForm/AddForm'
import { TodoList } from '../../components/TodoList/TodoList'
const Mainpage = () => {
    return (
        <div className='container'>
            <div className="main-page">
                <h4 className="main-page__title">Add todo</h4>
                <AddForm/>
                <TodoList/>
            </div>
        </div>
    )
}

export default Mainpage