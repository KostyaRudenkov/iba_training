import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, REMOVE_COMPLETED } from '../../constants.js';
import { load } from 'redux-localstorage-simple';


let TASKS = load( { namespace: 'todo-list' } );


if ( !TASKS || !TASKS.tasks || !TASKS.tasks.length ) {

    TASKS = { 

        tasks: [],
     }
}


const tasks = ( state = TASKS.tasks, { type, id, text, isDone } ) => {
 
    switch ( type ) {
        
        case ADD_TASK :
            
            return [ ...state, { id, text, isDone, } ];

        case REMOVE_TASK :

            return [ ...state ].filter( ( task ) => task.id !== id );

        case COMPLETE_TASK : 

            return [ ...state ].map( ( task ) => {

                if ( task.id === id ) {

                    task.isDone = !task.isDone;
                }

                return task;
            } );

        case REMOVE_COMPLETED : 

            return [ ...state ].filter( ( task ) => task.isDone === false );

        default:
            
            return state;
    }
}

export default tasks;