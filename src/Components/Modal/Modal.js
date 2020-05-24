import React from 'react'
import ReactDOM from 'react-dom';
import { Backdrop } from './Backdrop';


export const Modal = ({ children, opened, close }) => {


    const modalStyle = {
        visibility: opened ? 'visible' : 'hidden',
        transform: opened ? 'translate(-50%, -50%)' : 'translate(-50%, -150%)',
        opacity: opened ? '1' : '0',
    }

    return ReactDOM.createPortal(
        <>
            <Backdrop opened={opened} close={close} />
            <div style={modalStyle} className='my-modal'>
                {children}
            </div>
        </>, document.getElementById('root-modal')
    )
}
