import React from 'react';
import PropTypes from 'prop-types';

import './todo-input.css';

const ToDoInput = ( { onChange, onKeyPress, value, onClick } ) => (

    <div className='add-task-wrapper'>

        <i 
            className="fas fa-angle-down" 
        />

        <input 
            type        ="text" 
            className   = "input-add-task-description" 
            placeholder = "Add task using Enter or Plus"
            onChange    = { onChange }
            onKeyPress  = { onKeyPress }
            value       = { value }
        />
        <i 
            className = "fas fa-plus" 
            onClick   = { onClick }
        />
    </div>
)

ToDoInput.propTypes = {

    onChange:   PropTypes.func,
    onKeyPress: PropTypes.func,
    value:      PropTypes.string,
    onClick:    PropTypes.func,
}

ToDoInput.default = {

    onChange: () => {},
    onKeyPress: () => {},
    value:      '',
    onClick:    () => {},
}

export default ToDoInput;