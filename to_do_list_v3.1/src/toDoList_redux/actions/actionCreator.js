import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, REMOVE_COMPLETED } from "../../constants.js";


export const addTask = ( id, text, isDone ) => (

    {
        type: ADD_TASK,
        id,
        text,
        isDone,
    }

);

export const removeTask = ( id ) => ( 
    
    {
        type: REMOVE_TASK,
        id
    } 

);

export const completeTask = ( id ) => ( 

    {
        type: COMPLETE_TASK,
        id
    }
    
 );

export const removeCompleted = ( isDone ) => ( 
    {
        type: REMOVE_COMPLETED,
        isDone
    } 
);