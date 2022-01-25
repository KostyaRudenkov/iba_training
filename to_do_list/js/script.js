//=========================variables===================================
// localStorage.clear();
const inputTaskDescription = document.querySelector( '.input-add-task-description' );
const tasksList            = document.querySelector( '.tasks-list' );
const btnClearCompleted    = document.querySelector( '.btn-clear-completed' );
const btnMakeActiveAll     = document.querySelector( '.btn-active-all' );
const btnMakeCompleteAll   = document.querySelector( '.btn-complete-all' );

let tasksLeft              = document.querySelector( '.items-left' );

const FA_DONE      = 'fa-check-circle';
const FA_PENDING   = 'fa-circle';
const LINE_THROUGH = 'line-through';

let tasksArr, id;

//=========================check_local_storage=========================
const dataFromLocalStorage = localStorage.getItem( 'tasks' );

if ( !dataFromLocalStorage ) {
    
    tasksArr = [];
    id = 0;

} else {

    tasksArr = JSON.parse( localStorage.getItem( 'tasks' ) );
    loadTasksFromLocalStorage( tasksArr );
    id = tasksArr.length;
    amountTaskLeft( tasksArr );
}

//=========================functions==================================
function amountTaskLeft( arr ) {
    let count = 0;

    arr.forEach( function( item ) {

        if ( !item.isDone && !item.removed ) {
            count++;
        }
    } );

    tasksLeft.textContent = count;
}

function loadTasksFromLocalStorage( arr ) {

    arr.forEach( function( item ) {
        addTask( item.description, item.isDone, item.id, item.removed )
    } );
}

function Task( description, id ) {

    this.description = description;
    this.isDone      = false;
    this.id          = id;
    this.removed     = false;
}

function addTask( taskDescription, isDone, id, removed ) {

    if ( removed ) {
        return;
    }

    let taskCompleted;
    let textDecoration;
    
    if ( isDone ) {
        taskCompleted  = FA_DONE;
        textDecoration = LINE_THROUGH; 
        
    } else {
        taskCompleted  = FA_PENDING;
        textDecoration = '';
    }

    const task = '<li class="task-item"> \
                    <i class="far ' + taskCompleted + '" id="' + id + '" appointment="complete"></i> \
                    <p class="task-description ' + textDecoration + '" appointment="description"> ' + taskDescription + ' </p> \
                    <i class="fas fa-times" id="' + id + '" appointment="delete"></i> \
                 </li>';

    tasksList.insertAdjacentHTML( 'beforeend', task );
}

function doneTask( item ) {

    item.classList.toggle( FA_DONE );
    item.classList.toggle( FA_PENDING );
    item.parentNode.querySelector( '.task-description' ).classList.toggle( LINE_THROUGH );
    
    if ( tasksArr[ item.id ].isDone ) {
        tasksArr[ item.id ].isDone = false;
    } else {
        tasksArr[ item.id ].isDone = true;
    }

    amountTaskLeft( tasksArr );
}

function removeTask( item ) {

    console.log( item );
    item.parentNode.parentNode.removeChild( item.parentNode );
    tasksArr[ item.id ].removed = true;

    amountTaskLeft( tasksArr );
}

inputTaskDescription.addEventListener( 'keydown', function( event ) {
    
    if ( event.keyCode === 13 ) {

        const taskItem = inputTaskDescription.value;
        
        if ( taskItem ) {
            
            addTask( taskItem, false, id, false );
            tasksArr.push( new Task( taskItem, id ) ); 

            localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
            inputTaskDescription.value = '';

            amountTaskLeft( tasksArr );
            id++;

        } else {

            inputTaskDescription.style.border = '2px solid red';
            inputTaskDescription.style.borderRadius = '5px';
            setTimeout( function() {
                inputTaskDescription.style.border = 'none';
                inputTaskDescription.style.borderBottom = '1px solid lightgray';
            }, 500 );
        }
    }
} );

tasksList.addEventListener( 'click', function( event ) {

    const item = event.target;
    const itemAppointment = item.attributes.appointment.value;
    
    if ( itemAppointment === 'complete' ) {
        
        doneTask( item );

    } else if ( itemAppointment === 'delete' ) {

        removeTask( item );
    }

    localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
} );

btnClearCompleted.addEventListener( 'click', function() {

    tasksArr.forEach( function( item ) {

        if ( !item.removed && item.isDone ) {

            item.removed = true;
        }
    } );

    localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
    location.reload();
} );

btnMakeActiveAll.addEventListener( 'click', function() {

    tasksArr.forEach( function( item ) {

        if ( item.isDone ) {
            
            item.isDone = false;
        }

        localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
        location.reload();
    } );
} );

btnMakeCompleteAll.addEventListener( 'click', function() {

    tasksArr.forEach( function( item ) {

        if ( !item.isDone ) {
            
            item.isDone = true;
        }

        localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
        location.reload();
    } );
} );