import React, { Component } from "react";
import { connect } from 'react-redux';

import { addTask, removeTask, completeTask } from '../../actions/actionCreator.js'

import ToDoInput from "../../components/todo-input/todo-input.jsx";
import ToDoList from "../../components/todo-list/toDoList.jsx";

import './todo.css';

class ToDo extends Component {

    state = {
        activeFilter: 'all',
        taskText: ''
    }

    handleInputChange = ( { target: { value } } ) => {

        this.setState( {
            taskText: value,
        } );
    }

    addTask = ( { key } ) => {

        const { taskText } = this.state;

        // console.log( key );
        // console.log( taskText );

        if ( taskText.length > 3 && key === 'Enter' ) {

            const { addTask } = this.props;

            addTask( new Date().getTime(), taskText, false );

            this.setState( {
                taskText: '',
            } );
        }
    }

    render() {

        const { taskText } = this.state;
        const { tasks, removeTask, completeTask } = this.props;

        return(

            <div className='wrapper'>
            
                <ToDoInput 
                    onChange={ this.handleInputChange } 
                    onKeyPress={ this.addTask } 
                    value={ taskText } 
                />

                <ToDoList 
                    tasksList={ tasks } 
                    completeTask={ completeTask } 
                    removeTask={ removeTask } 
                />
            
            </div>
        );
    }
}

export default connect( state => ( { tasks: state.tasks,} ), { addTask, removeTask, completeTask } )( ToDo );
