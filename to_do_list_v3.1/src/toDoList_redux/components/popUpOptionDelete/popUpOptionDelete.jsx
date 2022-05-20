import React from "react";
import PropTypes from 'prop-types';

import './popUpOptionDelete.css';

const PopUpOptionDelete = ( { isOpen, closePopUp, openSelectMode, removeCompleted } ) => {

    return (

        <>
            { isOpen &&

                <ul className="options-for-delete">
                            
                    <li className="option-item"
                        onClick={ () => {
                                            removeCompleted();
                                            closePopUp();
                                        } }>
                        Delete completed
                    </li>

                    <li className="option-item"
                        onClick={ () => { 
                                            openSelectMode();
                                            closePopUp();
                                        } }>
                        Select and delete
                    </li>
                    
                </ul>
            }
        </>
    );
}

PopUpOptionDelete.propTypes = {

    isOpen:          PropTypes.bool,
    closePopUp:      PropTypes.func,
    openSelectMode:  PropTypes.func,
    removeCompleted: PropTypes.func,
}

PopUpOptionDelete.defaultProps = {

    isOpen:          false,
    closePopUp:      () => {},
    openSelectMode:  () => {},
    removeCompleted: () => {},
}

export default PopUpOptionDelete;