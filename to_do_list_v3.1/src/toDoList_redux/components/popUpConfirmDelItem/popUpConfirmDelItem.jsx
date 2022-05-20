import React from "react";

// import Portal from "../portal/portal";

import './popUpConfirmDelItem.css';


const PopUpConfirmDelItem = ( { isOpen, closeModal, onSubmit } ) => {

    return (
        <>
            { isOpen &&

                // <Portal>
                    <div className="popup-del-confirm">
        
                        <i className="fas fa-check" 
                           onClick={ () => onSubmit() }>
                        </i>
                        
                        <i className="fas fa-times fa-close-del-confirm"
                           onClick={ closeModal }>
                        </i>

                    </div>
                // </Portal>
            }
        </>
    );
} 

export default PopUpConfirmDelItem;