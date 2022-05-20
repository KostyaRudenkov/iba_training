import React from "react";
import PropTypes from 'prop-types';

import ToDoItem from "../todo-item/toDoItem.jsx";

import './toDoList.css';

const ToDoList = ( { tasksList, completeTask, removeTask, selectMode } ) => (
    
    <ul className="tasks-list">

        { tasksList.map( ( { id, text, isDone }, counter ) => (

            <ToDoItem 
                id           = { id } 
                text         = { text } 
                isDone       = { isDone }
                completeTask = { completeTask }
                removeTask   = { removeTask }
                selectMode   = { selectMode }
                counter      = { ++counter }
            />
        
        ) ) } 

    </ul>
);

ToDoList.propTypes = {

    tasksList:    PropTypes.array,
    completeTask: PropTypes.func,
    removeTask:   PropTypes.func,
    selectMode:   PropTypes.bool,
}

ToDoList.defaultProps = {

    tasksList:    [],
    completeTask: () => {},
    removeTask:   () => {},
    selectMode:   false,
}

export default ToDoList;