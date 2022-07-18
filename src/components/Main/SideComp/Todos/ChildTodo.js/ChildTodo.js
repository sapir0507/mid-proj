import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
// import TodoUtils from "../../../utils/TodosUtil";
import TodoUtils from '../../../../../utils/TodosUtil';
import './ChildTodo.scss';

function ChildTodo({id, todoId: userID, title, completed, updateTodos}) {
    const [_completed, set_Completed] = useState(completed)

    useEffect(() => {
      set_Completed(completed)
    }, [completed, userID])
    

    const todoCompleted = () => {
        const newTodo = {
            id: id,
            userID: userID,
            title: title,
            completed: true
        }
        TodoUtils.updateTodos(userID, newTodo);
        set_Completed("True")
        if(updateTodos!==undefined){
            updateTodos(true);
        }
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