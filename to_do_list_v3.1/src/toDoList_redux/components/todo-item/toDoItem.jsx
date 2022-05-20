import React, { Component } from "react";
import PropTypes from 'prop-types';

import PopUpConfirmDelItem from "../popUpConfirmDelItem/popUpConfirmDelItem.jsx";

import './toDoItem.css';

class ToDoItem extends Component {

    state = {
        isOpen: false,
    }

    openModal = () => this.setState( { isOpen: true, } );
    
    closeModal = () =>  this.setState( { isOpen: false, } );

    checkUncheckClass = ( isDone, [ unCheckClass, checkClass ] ) => isDone ? checkClass : unCheckClass;

    render() {

        const { id, text, isDone, completeTask, removeTask, selectMode, counter } = this.props;

        return (

            <li className={ selectMode ? this.checkUncheckClass( isDone, [ 'task-item selection-mode-for-tasks', 'task-item line-through-edit-mode' ] ) 
                                       : 'task-item' }>

                <span className={ selectMode ? 'counter-tasks' 
                                             : 'disabled' }>
                    { counter }
                </span>

                <i id = { id } 
                   className = { selectMode ? 'disabled' 
                                            : this.checkUncheckClass( isDone, [ 'far fa-circle', 'far fa-check-circle' ] ) }
                   onClick   = { () => completeTask( id ) }
                />

                <p id = { id } 
                   className = { selectMode ? this.checkUncheckClass( isDone, [ 'task-description', 'task-description line-through-edit-mode' ] ) 
                                            : this.checkUncheckClass( isDone, [ 'task-description', 'task-description line-through' ] ) }
                   onClick   = { () => completeTask( id ) } >
                    { text } 
                </p>

                <i id = { id }
                   className = { selectMode ? this.checkUncheckClass( isDone, [ 'fas fa-square', 'fas fa-check-square' ] ) 
                                            : 'fas fa-trash' } 
                   onClick   = { selectMode ? () => completeTask( id ) 
                                            : this.openModal }
                />

                <PopUpConfirmDelItem 
                    isOpen     = { this.state.isOpen }
                    closeModal = { this.closeModal }
                    onSubmit   = { () => { 
                                            removeTask( id );
                                            this.closeModal();
                                         } 
                                 }
                />

            </li> 
        )
    }

}

ToDoItem.propTypes = {

    id:           PropTypes.number,
    text:         PropTypes.string,
    isDone:       PropTypes.bool,
    removeTask:   PropTypes.func,
    completeTask: PropTypes.func,
    selectMode:   PropTypes.bool,
    counter:      PropTypes.number,
}

ToDoItem.defaultProps = {

    id:           0,
    text:         '',
    isDone:       false,
    removeTask:   () => {},
    completeTask: () => {},
    selectMode:   false,
    counter:      1,
}

export default ToDoItem;