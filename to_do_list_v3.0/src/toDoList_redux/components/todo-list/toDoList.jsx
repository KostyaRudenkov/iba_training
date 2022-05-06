import React from "react";

import ToDoItem from "../todo-item/toDoItem.jsx";

import './toDoList.css';

const ToDoList = ( { tasksList, removeTask, completeTask } ) => (

    // console.log( Array.isArray( tasksList ) );

    <ul className="tasks-list">


        { tasksList.map( ( { id, text, isCompleted } ) => (

            <ToDoItem 
                id={ id } 
                text={ text } 
                isCompleted={ isCompleted } 
                completeTask={ completeTask }
                removeTask={ removeTask }
            />
        ) ) }
    </ul>
);

export default ToDoList;