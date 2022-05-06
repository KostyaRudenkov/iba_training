import { ADD_TASK, COMPLETE_TASK, REMOVE_TASK } from "../../constants.js";

const TASKS = [

    {
        id: 1,
        text: 'Task 1',
        isCompleted: true,
    },

    {
        id: 2,
        text: 'Task 2',
        isCompleted: true,
    },

    {
        id: 3,
        text: 'Task 3',
        isCompleted: false,
    }
];

const tasks = ( state = TASKS, { id, text, isCompleted, type } ) => {

    switch ( type ) {

        case ADD_TASK :
            
            return [
                ...state, 
                {
                    id,
                    text,
                    isCompleted,
                }
            ];

        case REMOVE_TASK : 
            
            return [...state].filter( ( task ) => task.id !== id );

        case COMPLETE_TASK :

            return [...state].map( ( task ) => {

                if ( task.id === id ) {
                    task.isCompleted = !task.isCompleted;
                }
                
                return task;
            } );

        default: 
            return state;
    }
}

export default tasks;