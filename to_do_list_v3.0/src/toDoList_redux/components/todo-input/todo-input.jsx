import React from "react";
import PropTypes from 'prop-types';

import './todo-input.css';

const ToDoInput = ( { onChange, value, onKeyPress } ) => (

    <div className='add-task-wrapper'>

        <i className="fas fa-angle-down fa"></i>

        <input 
            type="text" 
            className="input-add-task-description"
            placeholder="Add your task using 'Enter' or 'Plus'"
            value={ value }   
            onChange={ onChange }
            onKeyPress={ onKeyPress }
        />

        <i className="fas fa-plus"></i>
    
    </div>
);

ToDoInput.propTypes = {

    value: PropTypes.string,
    onChange: PropTypes.func,
};

ToDoInput.defaultProps = {

    value: '',
    onChange: () => {},
}

export default ToDoInput;