// // localStorage.clear();

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
const DEL_CONFIRM_FORM = '<div class="popup-del-confirm" appointment="delete-confirm"> \
                            <i class="fas fa-check" appointment="popup-del-confirm-delete"></i> \
                            <i class="fas fa-times fa-close-del-confirm" appointment="popup-del-confirm-close"></i> \
                          </div>';


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
    
    this.inputTaskDescription = this.block.querySelector( '.input-add-task-description' );
    this.btnAddTask           = this.block.querySelector( '.fa-plus' );
    this.tasksList            = this.block.querySelector( '.tasks-list' );
    this.tasksLeft            = this.block.querySelector( '.items-left' );
    this.btnOptions           = this.block.querySelector( '.btn-options' );
    this.popupOptions         = this.block.querySelector( '.options-for-delete' );
    this.numberItemsLeft      = this.block.querySelector( '.number-items-left' );
    this.groupBtnForsMassDel  = this.block.querySelector( '.active-complete-btn-group' );
    this.controlPanel         = this.block.querySelector( '.control-panel' );
    this.btnSelectDeSelctAll  = this.block.querySelector( '.check-unchek-all' );
    this.btnCloseSelectMode   = this.block.querySelector( '.btn-close-selection-mode' );
    this.btnDeleteEditMode    = this.block.querySelector( '.btn-delete-edit-mode' );

    this.tasksArr = tasksArr;
    this.id = tasksArr.length;
    this.mode = STANDART_MODE;
    
    this.loadTasksFromLocalStorage();
    this.amountTaskLeft( this.tasksArr );

    this.inputTaskDescription.addEventListener( 'keydown', ( this.keyDownHandlerAddTask ).bind( this ) );
    this.btnAddTask.addEventListener( 'click', ( this.handlerAddTaskButton ).bind( this ) );
    this.tasksList.addEventListener( 'click', ( this.tasksListHandler ).bind( this ) );
    this.btnOptions.addEventListener( 'click', ( this.handlerBtnOptions ).bind( this ) );
    this.popupOptions.addEventListener( 'click', ( this.handlerPopupOptions ).bind( this ) );
    this.btnDeleteEditMode.addEventListener( 'click', ( this.handlerBtnDeleteEditMode ).bind( this ) );
    this.btnCloseSelectMode.addEventListener( 'click', ( this.handlerbtnCloseSelectMode ).bind( this ) );
    this.btnSelectDeSelctAll.addEventListener( 'click', ( this.handlerBtnSelectDeSelctAll ).bind( this ) );
}


ToDoList.prototype.markItems = function( tasksCollection, flag ) {

    let itemIndex, index;

    for ( let i = 0; i < tasksCollection.length; i++ ) {

        if ( tasksCollection[ i ].querySelector( '.fas' ).classList.contains( flag ) ) {

            tasksCollection[ i ].querySelector( '.fas' ).classList.toggle( FAS_CHECK );
            tasksCollection[ i ].querySelector( '.fas' ).classList.toggle( FAS_UNCHECK );
            tasksCollection[ i ].querySelector( '.task-description' ).classList.toggle( 'line-through-edit-mode' );
            tasksCollection[ i ].classList.toggle( 'line-through-edit-mode' );
            
            itemIndex = tasksCollection[ i ].querySelector( '.task-description' ).id;
            index = this.getRightIndex( this.tasksArr, itemIndex );

            this.reversePropertyInObjectTask( this.tasksArr, 'markDelEditMode', index );
        
            localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
        }
    }
}


ToDoList.prototype.handlerBtnSelectDeSelctAll = function() {

    let taskItems = this.block.querySelectorAll( '.task-item' );

    if ( this.btnSelectDeSelctAll.classList.contains( FAS_UNCHECK ) ) {
        
        this.markItems( taskItems, FAS_UNCHECK );

        this.btnSelectDeSelctAll.classList.toggle( FAS_UNCHECK );
        this.btnSelectDeSelctAll.classList.toggle( FAS_CHECK );

    } else if ( this.btnSelectDeSelctAll.classList.contains( FAS_CHECK ) ) {

        this.markItems( taskItems, FAS_CHECK );

        this.btnSelectDeSelctAll.classList.toggle( FAS_CHECK );
        this.btnSelectDeSelctAll.classList.toggle( FAS_UNCHECK );
    }
}


ToDoList.prototype.handlerBtnDeleteEditMode = function() {

    this.tasksArr.forEach( function( elem ) {

        if ( elem.markDelEditMode === true ) {

            elem.removed = true;
        }
    } );

    localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
    this.btnSelectDeSelctAll.classList.remove( FAS_CHECK );
    this.btnSelectDeSelctAll.classList.add( FAS_UNCHECK );
    this.tasksList.innerHTML = '';
    this.loadTasksFromLocalStorage( this.tasksArr );
    this.switchToEditMode();
}


ToDoList.prototype.handlerbtnCloseSelectMode = function() {

    this.inputTaskDescription.removeAttribute( 'disabled' );
    this.numberItemsLeft.style.display = 'block';
    this.btnOptions.style.display = 'block';
    this.groupBtnForsMassDel.style.display = 'none';
    this.controlPanel.style.justifyContent = 'space-between';

    const itemsOfTasks = this.block.querySelectorAll( '.task-item' );

    for ( let i = 0; i < itemsOfTasks.length; i++ ) {
        
        itemsOfTasks[ i ].classList.remove( 'selection-mode-for-tasks' );
        itemsOfTasks[ i ].classList.remove( 'line-through-edit-mode' );
        itemsOfTasks[ i ].querySelector( '.task-description' ).classList.remove( 'selection-mode-for-tasks' );
        itemsOfTasks[ i ].querySelector( '.task-description' ).classList.remove( 'line-through-edit-mode' );
        itemsOfTasks[ i ].removeChild( itemsOfTasks[ i ].querySelector( '.counter-tasks' ) );
        itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).style.display = 'block';
        itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FAS_UNCHECK );
        itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FAS_CHECK );
        itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.add( FA_TRASH );
    }

    this.tasksArr.forEach( function( elem ) { elem.markDelEditMode = false; } );
    localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );

    this.btnSelectDeSelctAll.classList.remove( FAS_CHECK );
    this.btnSelectDeSelctAll.classList.add( FAS_UNCHECK );
    this.amountTaskLeft( this.tasksArr );
    this.mode = STANDART_MODE;
}


ToDoList.prototype.keyDownHandlerAddTask = function( event ) {

    if ( event.keyCode === 13 ) {

        this.handlerAddTaskButton();
    }
}


ToDoList.prototype.closePopupDelConfirm = function( item ) {

    item.style.backgroundColor = 'white';
    item.style.cursor = 'pointer';
    item.textContent = 'Clear completed';
}


ToDoList.prototype.closeBtnOptions = function() {

    this.popupOptions.style.display = 'none';
    this.btnOptions.classList.remove( FAS_CLOSE );
    this.btnOptions.classList.add( FA_BURGER );
}


ToDoList.prototype.handlerBtnOptions = function() {

    if ( this.btnOptions.classList.contains( FA_BURGER ) ) {

        this.popupOptions.style.display = 'block';
        this.closePopupDelConfirm( this.popupOptions.querySelector( 'li:first-child' ) );
        this.btnOptions.classList.toggle( FA_BURGER );
        this.btnOptions.classList.toggle( FAS_CLOSE );

    } else if ( this.btnOptions.classList.contains( FAS_CLOSE ) ) {

        this.closeBtnOptions();
    }
}


ToDoList.prototype.amountTaskLeft = function( arr ) {

    let count = 0;

    arr.forEach( function( item ) {

        if ( !item.isDone && !item.removed ) {
            
            count++;
        }
    } );

    this.tasksLeft.textContent = count;
}


ToDoList.prototype.filteredArrTasks = function() {

    const taskActiveArr = this.tasksArr.filter( function( item ) { return item.isDone === false; } );
    const taskDoneArr   = this.tasksArr.filter( function( item ) { return item.isDone === true; } );
    
    this.tasksArr = taskActiveArr.concat( taskDoneArr );

    localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
    this.tasksList.innerHTML = '';
    this.loadTasksFromLocalStorage( this.tasksArr );
}


ToDoList.prototype.handlerAddTaskButton = function() {
    
    const taskItem = this.inputTaskDescription.value;
        
    if ( taskItem ) {

        this.addTask( taskItem, false, this.id, false );
        this.tasksArr.push( new Task( taskItem, this.id ) ); 

        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
        this.inputTaskDescription.value = '';

        this.amountTaskLeft( this.tasksArr );
        this.id++;

        this.filteredArrTasks();

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
    
        this.filteredArrTasks();
        this.amountTaskLeft( this.tasksArr );

    } else if ( this.mode === EDIT_MODE ) {

        this.markItemDone( item.parentNode, '.fas', '.task-description', { done: FAS_CHECK, pending: FAS_UNCHECK, paragraph: LINE_THROUGH_E_M } );
        item.parentNode.classList.toggle( LINE_THROUGH_E_M );
        
        this.reversePropertyInObjectTask( this.tasksArr, 'markDelEditMode', index );

        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
    }
};


ToDoList.prototype.closeFormDelConfirmForItem = function() {

    let parentItem;
    let itemsDel = document.querySelectorAll( '.popup-del-confirm' );

    for ( let i = 0; i < itemsDel.length; i++ ) {

        if ( itemsDel[ i ] ) {
            
            parentItem = itemsDel[ i ].parentNode;
            parentItem.removeChild( itemsDel[ i ] );
        }
    }
}


ToDoList.prototype.tasksListHandler = function( event ) {

    let item = event.target;
    let itemAppointment = item.attributes.appointment.value;
    
    
    if ( this.mode === STANDART_MODE ) {
        
        if ( itemAppointment === 'complete' || itemAppointment === 'description' ) {
            
            this.doneTask( item );
            
        } else if ( itemAppointment === 'delete' ) {
            
            item.parentNode.insertAdjacentHTML( 'beforeend', DEL_CONFIRM_FORM );
            
        } else if ( itemAppointment === 'popup-del-confirm-close' ) {
            
            this.closeFormDelConfirmForItem();
            
        } else if ( itemAppointment === 'popup-del-confirm-delete' ) {
            
            item.parentNode.parentNode.parentNode.removeChild( item.parentNode.parentNode );
            this.tasksArr[ item.parentNode.parentNode.querySelector( '.task-description' ).id ].removed = true;
            this.amountTaskLeft( this.tasksArr );
            
            localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
        }
        
        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );

    } else if ( this.mode === EDIT_MODE ) {

        if ( itemAppointment === 'description' || itemAppointment === 'delete' ) {
            
            this.doneTask( item );
        }
    }
}


ToDoList.prototype.switchToEditMode = function() {

    this.closeBtnOptions();
    this.inputTaskDescription.setAttribute( 'disabled', 'true' );
    this.numberItemsLeft.style.display = 'none';
    this.btnOptions.style.display = 'none';
    this.groupBtnForsMassDel.style.display = 'flex';
    this.controlPanel.style.justifyContent = 'center';

    const itemsOfTasks = this.block.querySelectorAll( '.task-item' );

    counter = 1;

    for ( let i = 0; i < itemsOfTasks.length; i++ ) {

        itemsOfTasks[ i ].classList.add( 'selection-mode-for-tasks' );
        itemsOfTasks[ i ].querySelector( '.task-description' ).classList.add( 'selection-mode-for-tasks' );
        itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).style.display = 'none';
        itemsOfTasks[ i ].querySelector( '.far-for-check-done' ).insertAdjacentHTML( 'beforebegin', '<span class="counter-tasks">' + counter + '</span>' );
        itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.remove( FA_TRASH );
        itemsOfTasks[ i ].querySelector( 'i:last-child' ).classList.add( FAS_UNCHECK );
        counter++;
    }

    this.mode = EDIT_MODE;
}


ToDoList.prototype.handlerPopupOptions = function( event ) {

    let item = event.target;
    let itemAppointment = item.attributes.appointment.value;
    
    if ( itemAppointment === 'clear-completed' ) {
        
        item.textContent = 'Are you sure?';
        item.style.cursor = 'default';
        item.style.backgroundColor = 'rgb(253, 251, 227)';
        item.insertAdjacentHTML( 'beforeend', DEL_CONFIRM_FORM );
        item.querySelector( '.popup-del-confirm' ).style.backgroundColor = 'rgb(253, 251, 227)';
    
    } else if ( itemAppointment === 'select-and-delete' ) {

        this.switchToEditMode();

    } else if ( itemAppointment === 'popup-del-confirm-delete' ) {

        //=============чтобы пулить сообщение когда нечего удалять
        const filtredArr = this.tasksArr.filter( function( elem ) { 

            return elem.isDone === true && elem.removed === false 
        } );
        //========================================================

        this.tasksArr.forEach( function( elem ) {

            if ( elem.isDone === true ) {

                elem.removed = true;
            }
        } );

        localStorage.setItem( this.keyToDoList, JSON.stringify( this.tasksArr ) );
        this.tasksList.innerHTML = '';
        this.loadTasksFromLocalStorage( this.tasksArr );

        this.closeBtnOptions();
        this.amountTaskLeft( this.tasksArr );
        
    } else if ( itemAppointment === 'popup-del-confirm-close' ) {
        
        this.closePopupDelConfirm( item.parentNode.parentNode );
    }
}



//=======================================CREATE-FORM==================================================
const ADD_TASK_INPUT_WITH_BUTTON = '<i class="fas fa-angle-down fa-1x"></i> \
                                    <input type="text" class="input-add-task-description" placeholder="Add task using Enter or Plus" /> \
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
    const spanCheckUnAll = createElementWithClass( 'i', 'fas fa-square fa-square-select-all check-unchek-all' );
    const iFaBars        = createElementWithClass( 'i', 'fas fa-bars btn-options' );
    const ulOptionDelete = createElementWithClass( 'ul', 'options-for-delete' );

    addTaskWrapper.innerHTML   = ADD_TASK_INPUT_WITH_BUTTON;
    itemsLeft.innerHTML        = ADD_TEXT_ITEMS_LEFT;
    buttonGroup.innerHTML      = ADD_BUTTON_GROUP;
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



document.addEventListener( 'click', function( event ) {

    const activeZone = [
                            'html',
                            'section',
                            'h1',
                            'div',
                            'input',
                            'p'
                       ];

    let currentElement   = event.target.localName;
    let popupOptionsGlob = Array.from( document.querySelectorAll( '.options-for-delete' ) );
    let btnOptionsGlob   = Array.from( document.querySelectorAll( '.btn-options' ) );

    activeZone.forEach( function( elem ) {

        if ( elem === currentElement ) {
    
            popupOptionsGlob.forEach( function( item ) { item.style.display = 'none'; } );
            btnOptionsGlob.forEach( function( item ) { item.classList.remove( FAS_CLOSE ); } );
            btnOptionsGlob.forEach( function( item ) { item.classList.add( FA_BURGER ); } );
            closeFormDelConfirmForItemGlob();
        }
    } );

} );


function closeFormDelConfirmForItemGlob() {

    let parentItem;
    let itemsDel = document.querySelectorAll( '.popup-del-confirm' );

    for ( let i = 0; i < itemsDel.length; i++ ) {

        if ( itemsDel[ i ] ) {
            
            parentItem = itemsDel[ i ].parentNode;
            parentItem.removeChild( itemsDel[ i ] );
        }
    }
}


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