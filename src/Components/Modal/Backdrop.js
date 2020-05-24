import React from 'react'

export const Backdrop = ({ opened, close }) => {


    const backDropStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100%',
        height: '100vh',
        opacity: opened ? '1' : '0',
        visibility: opened ? 'visible' : 'hidden',
        transition: 'all 0.4s',
        zIndex: '1500',
    }

    return (
        <div onClick={close} style={backDropStyle}>

        </div>
    )
}
