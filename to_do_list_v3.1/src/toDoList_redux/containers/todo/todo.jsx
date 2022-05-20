import React, { Component } from "react";
import { connect } from "react-redux";

import ToDoInput from "../../components/todo-input/todo-input.jsx";
import ToDoList from "../../components/todo-list/toDoList.jsx"
import ToDoFooter from "../../components/todo-footer/todo-footer.jsx";

import { addTask, removeTask, completeTask, removeCompleted } from '../../actions/actionCreator.js';
import './todo.css'


class ToDo extends Component {

    state = {
        
        taskDescription: '',
        selectMode: false,
    }

    openSelectMode = () => { this.setState( { selectMode: true, } ) }
    closeSelectMode = () => { this.setState( { selectMode: false, } ) }

    handlerInputChange = ( { target: { value } } ) => { this.setState( { taskDescription: value, } ); }

    handlerAddTask = () => {

        const { addTask }         = this.props;
        const { taskDescription } = this.state;

        if ( !taskDescription ) {

            const inputTask = document.querySelector( '.input-add-task-description' );
            inputTask.classList.add( 'input-border-alarm' );
            
            setTimeout( () => {

                inputTask.classList.remove( 'input-border-alarm' );
            }, 500 );
            
            return;
        }
    
        addTask( new Date().getTime(), taskDescription, false );

        this.setState( {
            taskDescription: '',
        } );
    }

    addTaskKeyPress = ( { key } ) => {
          
        if ( key === 'Enter' ) {
            
            this.handlerAddTask();
        }
    }

    addTaskOnClick = () => { this.handlerAddTask(); }

    getAmountTaskLeft = ( tasks ) => tasks.filter( ( task ) => !task.isDone ).length;

    getFilterTasksLis = ( tasks ) => {

        const arr1 = tasks.filter( task => !task.isDone );
        const arr2 = tasks.filter( task => task.isDone ); 

        return arr1.concat( arr2 );
    }

    render() {

        const { tasksList, completeTask, removeTask, removeCompleted } = this.props;
        const { taskDescription } = this.state;
        
        const amountTasks   = this.getAmountTaskLeft( tasksList );
        const filteredTasks = this.getFilterTasksLis( tasksList );

        return (

            <div className="wrapper">

                <ToDoInput 
                    onChange   = { this.handlerInputChange } 
                    value      = { taskDescription }
                    onKeyPress = { this.addTaskKeyPress }
                    onClick    = { this.addTaskOnClick }
                />

                <ToDoList
                    tasksList    = { filteredTasks } 
                    removeTask   = { removeTask }
                    completeTask = { completeTask }
                    selectMode   = { this.state.selectMode }
                />

                <ToDoFooter 
                    amountTasks     = { amountTasks }
                    tasksList       = { tasksList }
                    selectMode      = { this.state.selectMode }
                    openSelectMode  = { this.openSelectMode }
                    closeSelectMode = { this.closeSelectMode }
                    removeCompleted = { removeCompleted }
                />
            </div>
        );
    }
}


export default connect( 
    
    ( state ) => ( {

        tasksList: state.tasks,
    } ),

    { addTask, removeTask, completeTask, removeCompleted } 

)( ToDo );