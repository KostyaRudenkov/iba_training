import React, { Component } from "react";
import PropTypes from 'prop-types';

import PopUpOptionDelete from "../popUpOptionDelete/popUpOptionDelete.jsx";

import "./todo-footer.css";

class ToDoFooter extends Component {

    state = {
        isOpen:       false,
        faForOptions: 'fas fa-bars btn-options',
    }

    openPopUp = () => {

        this.setState( { 
            isOpen:       true, 
            faForOptions: 'fas btn-options fa-times',
        } ); 
    }

    closePopUp = () => {

        this.setState( {
            isOpen:       false,
            faForOptions: 'fas fa-bars btn-options',
        } );
    }

    switchToOpenClosePopUp = () => {

       this.state.faForOptions === 'fas fa-bars btn-options' ? this.openPopUp() : this.closePopUp();
    }

    render() {

        const { amountTasks, selectMode, openSelectMode, closeSelectMode, removeCompleted } = this.props;

        return (

            <div className="control-panel">
                
                <p className={ selectMode ? 'disabled' : 'number-items-left' }>

                    <span className="items-left">
                        { amountTasks }     
                    </span> tasks left
                        
                </p>
                
                <div className={ selectMode ? 'active-complete-btn-group' : 'disabled' }>
                    
                    <div className="button-group">
                        
                        <button className="btn-control-panel btn-delete-edit-mode"
                                onClick={ removeCompleted } >                            
                            
                            <i className="fas fa-trash-alt"></i>
                            Delete
                        </button>
                        
                        <button className="btn-control-panel btn-close-selection-mode"
                                onClick={ closeSelectMode }>
                            Cancel
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    
                    </div>

                </div>

                <div className="options">
        
                    <i className = { selectMode ? 'disabled' : this.state.faForOptions }
                       onClick   = { this.switchToOpenClosePopUp }
                    />

                    <PopUpOptionDelete
                        isOpen          = { this.state.isOpen }
                        showTasks       = { this.showTasks }
                        openSelectMode  = { openSelectMode }
                        closePopUp      = { this.closePopUp }
                        removeCompleted = { removeCompleted }
                    />
                </div>
            
            </div>
            

        );
    }
}


ToDoFooter.propTypes = {

    amountTasks:     PropTypes.number,
    selectMode:      PropTypes.bool, 
    openSelectMode:  PropTypes.func,
    closeSelectMode: PropTypes.func, 
    removeCompleted: PropTypes.func,
}

ToDoFooter.defaulProps = {

    amountTasks:     PropTypes.number,
    selectMode:      false, 
    openSelectMode:  () => {},
    closeSelectMode: () => {}, 
    removeCompleted: PropTypes.func,
}

export default ToDoFooter;