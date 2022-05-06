import React from "react";
import PropTypes from "prop-types";

import './toDoItem.css';

const ToDoItem = ( { text, removeTask, id, isCompleted, completeTask } ) => (

    <li className="task-item">
        {/* <i class="far ' + taskCompleted + ' far-for-check-done" id="' + id + '" appointment="complete"></i> */}
        
        <i 
            className={ isCompleted ? 'far fa-check-circle' : 'far fa-circle' } 
            onClick={ () => completeTask( id ) }
            appointment="complete">
        </i>
        
        <p 
            className={ isCompleted ? 'task-description line-through' : 'task-description' }
            onClick={ () => completeTask( id ) }
            >{ text }
        </p>
        
        <i 
            className="fas fa-trash" 
            onClick={ () => removeTask( id ) }>
        </i>

        {/* <i class="fas fa-trash" id="' + id + '" appointment="delete"></i> */}
    </li>
);

ToDoItem.defaultProps = {
    text: '',
    isCompleted: false,
    id: 0,
};

ToDoItem.propTypes = {
    text: PropTypes.string,
    removeTask: PropTypes.func,
    id: PropTypes.number,
};

export default ToDoItem;