// //=========================variables===================================
// // localStorage.clear();
// const inputTaskDescription = document.querySelector( '.input-add-task-description' );
// const tasksList            = document.querySelector( '.tasks-list' );
// const btnOptions           = document.querySelector( '.btn-options' );
// const btnDeleteEditMode    = document.querySelector( '.btn-delete-edit-mode' );
// const btnCloseSelectMode   = document.querySelector( '.btn-close-selection-mode' );
// const btnAddTask           = document.querySelector( '.fa-plus' );
// const popupOptions         = document.querySelector( '.options-for-delete' );
// const btnCloseOptions      = document.querySelector( '.fa-times' );
// const popupDelConfirm      = document.querySelector( '.popup-del-confirm' );
// const groupBtnForsMassDel  = document.querySelector( '.active-complete-btn-group' );
// const numberItemsLeft      = document.querySelector( '.number-items-left' );
// const controlPanel         = document.querySelector( '.control-panel' );
// const btnSelectDeSelctAll  = document.querySelector( '.check-unchek-all' );

// const popupBg       = document.querySelector( '.popup-bckg' );
// const popup         = document.querySelector( '.popup' );
// const btnClosePopup = document.querySelector( '.btn-close-popup' );
// const btnApproveDel = document.querySelector( '.btn-approve-del' );

const FA_DONE          = 'fa-check-circle';
const FA_PENDING       = 'fa-circle';
const FAS_CHECK        = 'fa-check-square';
const FAS_UNCHECK      = 'fa-square';
const FA_TRASH         = 'fa-trash';
const FA_BURGER        = 'fa-bars';
const FAS_CLOSE        = 'fa-times';
const LINE_THROUGH     = 'line-through';
const LINE_THROUGH_E_M = 'line-through-edit-mode';
const STANDART_MODE    = 'standart_mode';
const EDIT_MODE        = 'edit_mode';
// const DEL_CONFIRM_FORM = '<div class="popup-del-confirm" appointment="delete-confirm"> \
//                             <i class="fas fa-check" appointment="popup-del-confirm-delete"></i> \
//                             <i class="fas fa-times fa-close-del-confirm" appointment="popup-del-confirm-close"></i> \
//                           </div>';

// let tasksLeft = document.querySelector( '.items-left' );
// let tasksArr;
// let id;
// let mode = STANDART_MODE;

// //=========================check_local_storage=========================
// const dataFromLocalStorage = localStorage.getItem( 'tasks' );

// if ( !dataFromLocalStorage ) {
    
//     tasksArr = [];
//     id = 0;

// } else {

//     tasksArr = JSON.parse( localStorage.getItem( 'tasks' ) );
//     loadTasksFromLocalStorage( tasksArr );
//     id = tasksArr.length;
//     amountTaskLeft( tasksArr );
// }

// //=========================functions==================================
// function amountTaskLeft( arr ) {

//     let count = 0;

//     arr.forEach( function( item ) {

//         if ( !item.isDone && !item.removed ) {
            
//             count++;
//         }
//     } );

//     tasksLeft.textContent = count;
// }


// function loadTasksFromLocalStorage( arr ) {

//     arr.forEach( function( item ) {
//         addTask( item.description, item.isDone, item.id, item.removed );
//     } );
// }


// function Task( description, id ) {

//     this.description     = description;
//     this.isDone          = false;
//     this.id              = id;
//     this.removed         = false;
//     this.markDelEditMode = false;
// }


// function addTask( taskDescription, isDone, id, removed ) {

//     if ( removed ) {
//         return;
//     }

//     let taskCompleted, textDecoration;
    
//     if ( isDone ) {

//         taskCompleted  = FA_DONE;
//         textDecoration = LINE_THROUGH; 
        
//     } else {

//         taskCompleted  = FA_PENDING;
//         textDecoration = '';
//     }

//     const task = '<li class="task-item"> \
//                     <i class="far ' + taskCompleted + ' far-for-check-done" id="' + id + '" appointment="complete"></i> \
//                     <p class="task-description ' + textDecoration + '" id="' + id + '" appointment="description"> ' + taskDescription + ' </p> \
//                     <i class="fas fa-trash" id="' + id + '" appointment="delete"></i> \
//                  </li>';

//     tasksList.insertAdjacentHTML( 'beforeend', task );
// }


// function closePopupDelConfirm( item ) {

//     item.style.backgroundColor = 'white';
//     item.style.cursor = 'pointer';
//     item.textContent = 'Clear completed';
// }


// function markItems( tasksCollection, flag ) {

//     let itemIndex, index;

//     for ( let i = 0; i < tasksCollection.length; i++ ) {

//         if ( tasksCollection[ i ].querySelector( '.fas' ).classList.contains( flag ) ) {

//             tasksCollection[ i ].querySelector( '.fas' ).classList.toggle( FAS_CHECK );
//             tasksCollection[ i ].querySelector( '.fas' ).classList.toggle( FAS_UNCHECK );
//             tasksCollection[ i ].querySelector( '.task-description' ).classList.toggle( 'line-through-edit-mode' );
//             tasksCollection[ i ].classList.toggle( 'line-through-edit-mode' );
            
//             itemIndex = tasksCollection[ i ].querySelector( '.task-description' ).id;
//             index = getRightIndex( tasksArr, itemIndex );

//             reversePropertyInObjectTask( tasksArr, 'markDelEditMode', index );
        
//             localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//         }
//     }
// }


// function filteredArrTasks() {

//     const taskActiveArr = tasksArr.filter( function( item ) { return item.isDone === false; } );
//     const taskDoneArr   = tasksArr.filter( function( item ) { return item.isDone === true; } );
    
//     tasksArr = taskActiveArr.concat( taskDoneArr );

//     localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//     tasksList.innerHTML = '';
//     loadTasksFromLocalStorage( tasksArr );
// }


// function getRightIndex( arr, idOfArr ) {

//     let findIndex;
    
//     arr.forEach( function( elem, index ) {
        
//         if ( elem.id === Number( idOfArr ) ) {
            
//             findIndex = index;
//         }
//     } );

//     return findIndex;
// }


// function reversePropertyInObjectTask( arr, property, index ) {

//     if ( arr[ index ][ property ] ) {
    
//         arr[ index ][ property ] = false;

//     } else {
        
//         arr[ index ][ property ] = true;
//     }
// }


// function closeFormDelConfirmForItem() {

//     let parentItem;
//     let itemsDel = document.querySelectorAll( '.popup-del-confirm' );

//     for ( let i = 0; i < itemsDel.length; i++ ) {

//         if ( itemsDel[ i ] ) {
            
//             parentItem = itemsDel[ i ].parentNode;
//             parentItem.removeChild( itemsDel[ i ] );
//         }
//     }
// }


// function closeBtnOptions() {

//     popupOptions.style.display = 'none';
//     btnOptions.classList.remove( FAS_CLOSE );
//     btnOptions.classList.add( FA_BURGER );
// }


// function markItemDone( item, selectorIco, selectorTxt, iconsClassesObj ) {

//     item.querySelector( selectorIco ).classList.toggle( iconsClassesObj.done );
//     item.querySelector( selectorIco ).classList.toggle( iconsClassesObj.pending );
//     item.querySelector( selectorTxt ).classList.toggle( iconsClassesObj.paragraph );
// }


// function doneTask( item ) {

//     let index = getRightIndex( tasksArr, item.id );

//     if ( mode === STANDART_MODE ) {

//         markItemDone( item.parentNode, '.far-for-check-done', '.task-description', { done: FA_DONE, pending: FA_PENDING, paragraph: LINE_THROUGH } );

//         reversePropertyInObjectTask( tasksArr, 'isDone', index );
    
//         filteredArrTasks();
//         amountTaskLeft( tasksArr );

//     } else if ( mode === EDIT_MODE ) {

//         markItemDone( item.parentNode, '.fas', '.task-description', { done: FAS_CHECK, pending: FAS_UNCHECK, paragraph: LINE_THROUGH_E_M } );
//         item.parentNode.classList.toggle( LINE_THROUGH_E_M );
        
//         reversePropertyInObjectTask( tasksArr, 'markDelEditMode', index );

//         localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//     }
// };


// function switchToEditMode() {

//     closeBtnOptions();
//     inputTaskDescription.setAttribute( 'disabled', 'true' );
//     numberItemsLeft.style.display = 'none';
//     btnOptions.style.display = 'none';
//     groupBtnForsMassDel.style.display = 'flex';
//     controlPanel.style.justifyContent = 'center';

//     const itemsOfTasks =  document.querySelectorAll( '.task-item' );

//     let counter = 1;

//     for ( let i = 0; i < itemsOfTasks.length; i++ ) {

//         itemsOfTasks[ i ].classList.add( 'selection-mode-for-tasks' );
//         itemsOfTasks[ i ].querySelector( '.task-description' ).classList.add( 'selection-mode-for-tasks' );
//         itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).style.display = 'none';
//         itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).insertAdjacentHTML( 'beforebegin', '<span class="counter-tasks">' + counter + '</span>' );
//         itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FA_TRASH );
//         itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.add( FAS_UNCHECK );
//         counter++;
//     }

//     mode = EDIT_MODE;
// }

// //======================HANDLERS======================================
// function handlerAddTaskButton() {

//     const taskItem = inputTaskDescription.value;
        
//     if ( taskItem ) {
        
//         addTask( taskItem, false, id, false );
//         tasksArr.push( new Task( taskItem, id ) ); 

//         localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//         inputTaskDescription.value = '';

//         amountTaskLeft( tasksArr );
//         id++;

//         filteredArrTasks();

//     } else if ( taskItem === '' ) {

//         inputTaskDescription.classList.add( 'input-border-alarm' );

//         setTimeout( function() {

//             inputTaskDescription.classList.remove( 'input-border-alarm' );
//         }, 500 );
//     }
// }


// function handlerAddTaskEnter( event ) {

//     if ( event.keyCode === 13 ) {

//         handlerAddTaskButton();
//     }
// }

// function tasksListHandler( event ) {

//     let item = event.target;
//     let itemAppointment = item.attributes.appointment.value;

//     if ( mode === STANDART_MODE ) {
     
//         if ( itemAppointment === 'complete' || itemAppointment === 'description' ) {
            
//             doneTask( item );

//         } else if ( itemAppointment === 'delete' ) {

//             item.parentNode.insertAdjacentHTML( 'beforeend', DEL_CONFIRM_FORM );

//         } else if ( itemAppointment === 'popup-del-confirm-close' ) {
                
//             closeFormDelConfirmForItem();

//         } else if ( itemAppointment === 'popup-del-confirm-delete' ) {

//             item.parentNode.parentNode.parentNode.removeChild( item.parentNode.parentNode );
//             tasksArr[ item.parentNode.parentNode.querySelector( '.task-description' ).id ].removed = true;
//             amountTaskLeft( tasksArr );

//             localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//         }
        
//         localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );

//     } else if ( mode === EDIT_MODE ) {

//         if ( itemAppointment === 'description' || itemAppointment === 'delete' ) {
            
//             doneTask( item );
//         }
//     }
// }


// function handlerBtnOptions() {

//     if ( btnOptions.classList.contains( FA_BURGER ) ) {

//         popupOptions.style.display = 'block';
//         closePopupDelConfirm( popupOptions.querySelector( 'li:first-child' ) );
//         btnOptions.classList.toggle( FA_BURGER );
//         btnOptions.classList.toggle( FAS_CLOSE );

//     } else if ( btnOptions.classList.contains( FAS_CLOSE ) ) {

//         closeBtnOptions();
//     }
// }


// function handlerPopupOptions( event ) {

//     let item = event.target;
//     let itemAppointment = item.attributes.appointment.value;
    
//     if ( itemAppointment === 'clear-completed' ) {
        
//         item.textContent = 'Are you sure?';
//         item.style.cursor = 'default';
//         item.style.backgroundColor = 'rgb(253, 251, 227)';
//         item.insertAdjacentHTML( 'beforeend', DEL_CONFIRM_FORM );
//         item.querySelector( '.popup-del-confirm' ).style.backgroundColor = 'rgb(253, 251, 227)';
    
//     } else if ( itemAppointment === 'select-and-delete' ) {

//         switchToEditMode();

//     } else if ( itemAppointment === 'popup-del-confirm-delete' ) {

//         //=============чтобы пулить сообщение когда нечего удалять
//         const filtredArr = tasksArr.filter( function( elem ) { 
//             return elem.isDone === true && elem.removed ===false 
//         } );
//         //========================================================

//         tasksArr.forEach( function( elem ) {

//             if ( elem.isDone === true ) {

//                 elem.removed = true;
//             }
//         } );

//         localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//         tasksList.innerHTML = '';
//         loadTasksFromLocalStorage( tasksArr );

//         closeBtnOptions();
        
//     } else if ( itemAppointment === 'popup-del-confirm-close' ) {
        
//         closePopupDelConfirm( item.parentNode.parentNode );
//     }
// }


// function handlerBtnSelectDeSelctAll() {

//     let taskItems = document.querySelectorAll( '.task-item' );

//     if ( btnSelectDeSelctAll.textContent === 'Select All' ) {
        
//         markItems( taskItems, FAS_UNCHECK );

//         btnSelectDeSelctAll.textContent = 'DeSelect All';

//     } else if ( btnSelectDeSelctAll.textContent === 'DeSelect All' ) {

//         markItems( taskItems, FAS_CHECK );

//         btnSelectDeSelctAll.textContent = 'Select All';
//     }
// }

// function handlerbtnCloseSelectMode() {

//     inputTaskDescription.removeAttribute( 'disabled' );
//     numberItemsLeft.style.display = 'block';
//     btnOptions.style.display = 'block';
//     groupBtnForsMassDel.style.display = 'none';
//     controlPanel.style.justifyContent = 'space-between';

//     const itemsOfTasks = document.querySelectorAll( '.task-item' );

//     for ( let i = 0; i < itemsOfTasks.length; i++ ) {
        
//         itemsOfTasks[ i ].classList.remove( 'selection-mode-for-tasks' );
//         itemsOfTasks[ i ].classList.remove( 'line-through-edit-mode' );
//         itemsOfTasks[ i ].querySelector( '.task-description' ).classList.remove( 'selection-mode-for-tasks' );
//         itemsOfTasks[ i ].querySelector( '.task-description' ).classList.remove( 'line-through-edit-mode' );
//         itemsOfTasks[ i ].removeChild( itemsOfTasks[ i ].querySelector( '.counter-tasks' ) );
//         itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).style.display = 'block';
//         itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FAS_UNCHECK );
//         itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FAS_CHECK );
//         itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.add( FA_TRASH );
//     }

//     tasksArr.forEach( function( elem ) { elem.markDelEditMode = false; } );
//     localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );

//     btnSelectDeSelctAll.textContent = 'Select All';
//     amountTaskLeft( tasksArr );
//     mode = STANDART_MODE;
// }


// function handlerBtnDeleteEditMode() {

//     tasksArr.forEach( function( elem ) {

//         if ( elem.markDelEditMode === true ) {

//             elem.removed = true;
//         }
//     } );

//     localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//     btnSelectDeSelctAll.textContent = 'Select All';
//     tasksList.innerHTML = '';
//     loadTasksFromLocalStorage( tasksArr );
//     switchToEditMode();
// }


// //=======================EVENT_LISTENERS===============================
// inputTaskDescription.addEventListener( 'keydown', handlerAddTaskEnter );


// btnAddTask.addEventListener( 'click', handlerAddTaskButton );


// tasksList.addEventListener( 'click', tasksListHandler );


// btnOptions.addEventListener( 'click', handlerBtnOptions );


// popupOptions.addEventListener( 'click', handlerPopupOptions );


// btnSelectDeSelctAll.addEventListener( 'click', handlerBtnSelectDeSelctAll );


// btnCloseSelectMode.addEventListener( 'click', handlerbtnCloseSelectMode );


// btnDeleteEditMode.addEventListener( 'click', handlerBtnDeleteEditMode );


// document.addEventListener( 'click', function( event ) {

//     const activeZone = [
//                             'html',
//                             'section',
//                             'h1',
//                             'div',
//                             'input',
//                             'p'
//                        ];

//     let currentElement = event.target.localName;

//     activeZone.forEach( function( elem ) {

//         if ( elem === currentElement ) {
    
//             closeBtnOptions();
//             closeFormDelConfirmForItem();
//         }
//     } );

// } );


// const inputText = document.querySelector( '.input-text' );
// const buttonClick = document.querySelector( '.button-click' );

// const container = document.querySelector( '.container' );

// let i = 0;

// function List( counter ) {

//     const div = document.createElement( 'div' );
//     div.classList.add( 'div-style' );
//     div.innerText = counter;

//     return div;
// }

// buttonClick.addEventListener( 'click', function() {

//     const div = new List( i );
//     container.appendChild( div );

//     i++;
// } );


// container.addEventListener( 'click', function( event ) {
    
//     console.log( event.target.innerText );
// } );










function Task( description, id ) {

    this.description     = description;
    this.isDone          = false;
    this.id              = id;
    this.removed         = false;
    this.markDelEditMode = false;
}


function ToDoList( block, keyToDoList, tasksArr ) {

    this.block       = block;
    this.keyToDoList = keyToDoList;

    createToDoList( this.block );
    
    this.inputTaskDescription = document.querySelector( '.input-add-task-description' );
    this.btnAddTask           = document.querySelector( '.fa-plus' );
    this.tasksList            = document.querySelector( '.tasks-list' );

    this.tasksArr = tasksArr;
    this.id = tasksArr.length;
    this.mode = STANDART_MODE;
    
    this.loadTasksFromLocalStorage();

    this.inputTaskDescription.addEventListener( 'keydown', ( this.keyDownHandlerAddTask ).bind( this ) );
    this.btnAddTask.addEventListener( 'click', ( this.handlerAddTaskButton ).bind( this ) );
    this.tasksList.addEventListener( 'click', ( this.tasksListHandler ).bind( this ) );
}


ToDoList.prototype.keyDownHandlerAddTask = function( event ) {

    if ( event.keyCode === 13 ) {

        this.handlerAddTaskButton();
    }
}


ToDoList.prototype.handlerAddTaskButton = function() {
    
    const taskItem = this.inputTaskDescription.value;
        
    if ( taskItem ) {

        this.addTask( taskItem, false, this.id, false );
        this.tasksArr.push( new Task( taskItem, this.id ) ); 

        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
        this.inputTaskDescription.value = '';

        // amountTaskLeft( tasksArr );
        this.id++;

        // filteredArrTasks();

    } else if ( taskItem === '' ) {

        this.inputTaskDescription.classList.add( 'input-border-alarm' );

        setTimeout( ( function() {

            this.inputTaskDescription.classList.remove( 'input-border-alarm' );
        } ).bind( this ), 500 );
    }
}


ToDoList.prototype.addTask = function( taskDescription, isDone, id, removed ) {

    if ( removed ) {
        return;
    }

    let taskCompleted, textDecoration;
    
    if ( isDone ) {

        taskCompleted  = FA_DONE;
        textDecoration = LINE_THROUGH; 
        
    } else {

        taskCompleted  = FA_PENDING;
        textDecoration = '';
    }

    const task = '<li class="task-item"> \
                    <i class="far ' + taskCompleted + ' far-for-check-done" id="' + id + '" appointment="complete"></i> \
                    <p class="task-description ' + textDecoration + '" id="' + id + '" appointment="description"> ' + taskDescription + ' </p> \
                    <i class="fas fa-trash" id="' + id + '" appointment="delete"></i> \
                 </li>';

    this.tasksList.insertAdjacentHTML( 'beforeend', task );
}


ToDoList.prototype.loadTasksFromLocalStorage = function(  ) {

    if ( this.tasksArr.length ) {
        
        this.tasksArr.forEach( ( function( item ) {

            this.addTask( item.description, item.isDone, item.id, item.removed );

        } ).bind( this ) );
    }
}


ToDoList.prototype.markItemDone = function( item, selectorIco, selectorTxt, iconsClassesObj ) {

    item.querySelector( selectorIco ).classList.toggle( iconsClassesObj.done );
    item.querySelector( selectorIco ).classList.toggle( iconsClassesObj.pending );
    item.querySelector( selectorTxt ).classList.toggle( iconsClassesObj.paragraph );
}


ToDoList.prototype.reversePropertyInObjectTask = function( arr, property, index ) {

    if ( arr[ index ][ property ] ) {
    
        arr[ index ][ property ] = false;

    } else {
        
        arr[ index ][ property ] = true;
    }
}


ToDoList.prototype.getRightIndex = function( arr, idOfArr ) {

    let findIndex;
    
    arr.forEach( function( elem, index ) {
        
        if ( elem.id === Number( idOfArr ) ) {
            
            findIndex = index;
        }
    } );

    return findIndex;
}


ToDoList.prototype.doneTask = function( item ) {

    let index = this.getRightIndex( this.tasksArr, item.id );

    if ( this.mode === STANDART_MODE ) {

        this.markItemDone( item.parentNode, '.far-for-check-done', '.task-description', { done: FA_DONE, pending: FA_PENDING, paragraph: LINE_THROUGH } );

        this.reversePropertyInObjectTask( this.tasksArr, 'isDone', index );
    
        // filteredArrTasks();
        // amountTaskLeft( tasksArr );

    } 
//      else if ( mode === EDIT_MODE ) {

//         markItemDone( item.parentNode, '.fas', '.task-description', { done: FAS_CHECK, pending: FAS_UNCHECK, paragraph: LINE_THROUGH_E_M } );
//         item.parentNode.classList.toggle( LINE_THROUGH_E_M );
        
//         reversePropertyInObjectTask( tasksArr, 'markDelEditMode', index );

//         localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
//     }
};


ToDoList.prototype.tasksListHandler = function( event ) {

    let item = event.target;
    let itemAppointment = item.attributes.appointment.value;
    
    
    if ( this.mode === STANDART_MODE ) {
        
        if ( itemAppointment === 'complete' || itemAppointment === 'description' ) {
            
            this.doneTask( item );
            
        } else if ( itemAppointment === 'delete' ) {
            
            item.parentNode.insertAdjacentHTML( 'beforeend', DEL_CONFIRM_FORM );
            
        } else if ( itemAppointment === 'popup-del-confirm-close' ) {
            
            closeFormDelConfirmForItem();
            
        } else if ( itemAppointment === 'popup-del-confirm-delete' ) {
            
            item.parentNode.parentNode.parentNode.removeChild( item.parentNode.parentNode );
            tasksArr[ item.parentNode.parentNode.querySelector( '.task-description' ).id ].removed = true;
            amountTaskLeft( tasksArr );
            
            localStorage.setItem( 'tasks', JSON.stringify( tasksArr ) );
        }
        
        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );

    } else if ( this.mode === EDIT_MODE ) {

        if ( itemAppointment === 'description' || itemAppointment === 'delete' ) {
            
            doneTask( item );
        }
    }
}






//=======================================CREATE-FORM==================================================
const ADD_TASK_INPUT_WITH_BUTTON = '<i class="fas fa-angle-down fa-1x"></i> \
                                    <input type="text" class="input-add-task-description" placeholder="Add your task using Enter or Plus" /> \
                                    <i class="fas fa-plus fa-1x"></i>';

const ADD_TEXT_ITEMS_LEFT        = '<span class="items-left">0</span> items left';

const ADD_BUTTON_GROUP           = '<button class="btn-control-panel btn-delete-edit-mode" value="active"> \
                                    <i class="fas fa-trash-alt"></i> \
                                    Delete</button> \
                                    <button class="btn-control-panel btn-close-selection-mode" value="completed">Cancel \
                                    <i class="fas fa-sign-out-alt"></i> \
                                    </button>';

const ADD_ITEMS_FOR_OPTION_DEL   = '<li class="option-item" appointment="clear-completed">Clear completed</li> \
                                    <li class="option-item" appointment="select-and-delete">Select and delete</li>';

function createElementWithClass( nameEl, classEl ) {

    const element = document.createElement( nameEl );
    
    classEl.split( ' ' ).forEach( function( item ) {

        element.classList.add( item );
    } );

    return element;
}

function appendArrElmentsIntoNode( nameNode, arrElements ) {

    arrElements.forEach( function( item ) {

        nameNode.appendChild( item );
    } );
}

function createToDoList( block ) {

    const wrapper        = createElementWithClass( 'div', 'wrapper' );
    const taskContent    = createElementWithClass( 'div', 'tasks-content' );
    const addTaskWrapper = createElementWithClass( 'div', 'add-task-wrapper' );
    const tasksList      = createElementWithClass( 'ul', 'tasks-list' );
    const controlPanel   = createElementWithClass( 'div', 'control-panel' );
    const itemsLeft      = createElementWithClass( 'p', 'number-items-left' );
    const activeBtnGroup = createElementWithClass( 'div', 'active-complete-btn-group' );
    const optionsPopUp   = createElementWithClass( 'div', 'options' );
    const buttonGroup    = createElementWithClass( 'div', 'button-group' );
    const spanCheckUnAll = createElementWithClass( 'span', 'check-unchek-all' );
    const iFaBars        = createElementWithClass( 'i', 'fas fa-bars btn-options' );
    const ulOptionDelete = createElementWithClass( 'ul', 'options-for-delete' );

    addTaskWrapper.innerHTML   = ADD_TASK_INPUT_WITH_BUTTON;
    itemsLeft.innerHTML        = ADD_TEXT_ITEMS_LEFT;
    buttonGroup.innerHTML      = ADD_BUTTON_GROUP;
    spanCheckUnAll.textContent = 'Select All';
    ulOptionDelete.innerHTML   = ADD_ITEMS_FOR_OPTION_DEL;

    appendArrElmentsIntoNode( taskContent, [ addTaskWrapper, tasksList ] );
    appendArrElmentsIntoNode( activeBtnGroup, [ buttonGroup, spanCheckUnAll ] );
    appendArrElmentsIntoNode( optionsPopUp, [ iFaBars, ulOptionDelete ] );
    appendArrElmentsIntoNode( controlPanel, [ itemsLeft, activeBtnGroup, optionsPopUp ] );
    appendArrElmentsIntoNode( wrapper, [ taskContent, controlPanel ] );
    block.appendChild( wrapper );

    return wrapper;
};
//=======================================CREATE-FORM==================================================/





function initToDoList( block, nameObjectToDo ) {

    const keysOfLocalStorage = Object.keys( localStorage );
    let tasksArr = [];

    if ( keysOfLocalStorage.length ) {

        keysOfLocalStorage.forEach( function( item ) {
        
            if ( nameObjectToDo === item ) {

                tasksArr = JSON.parse( localStorage.getItem( nameObjectToDo ) );
            } 
        } );
    }

    new ToDoList( block, nameObjectToDo, tasksArr );
}


initToDoList( document.querySelector( '.block-2' ), 'toDo_1' );
initToDoList( document.querySelector( '.block-1' ), 'toDo_2' );