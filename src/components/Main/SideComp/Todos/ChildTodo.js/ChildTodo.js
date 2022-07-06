import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
// import TodoUtils from "../../../utils/TodosUtil";
import TodoUtils from '../../../../../utils/TodosUtil';
import './ChildTodo.scss';

function ChildTodo({todoId, title, completed}) {
    const [_completed, set_Completed] = useState(completed)

    useEffect(() => {
      set_Completed(completed)
    }, [completed, todoId])
    

    const todoCompleted = () => {
        const newTodo = {
            userID: todoId,
            title: title,
            completed: true
        }
        TodoUtils.updateTodos(todoId, newTodo);
        set_Completed("True")
    }

    return ( <Container className="childTodo">


            <div><span style={{marginRight: '15px'}}>Title:</span>  {title}</div>
            <div className="todoItem"> 
                Completed: {_completed}
                <div>
                    {_completed!=="True" && 
                    <button 
                        className="btn btn-info"
                        onClick={todoCompleted}
                    >
                        Mark Completed
                        </button>}
                </div>
            </div>
    

    </Container> );
}

export default ChildTodo;