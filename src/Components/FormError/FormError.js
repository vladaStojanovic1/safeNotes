import React from 'react';



export const FormError = ({ message, touched }) => {
    const errorStyle = {
        fontSize: '10px',
        color: '#ff6565',
        fontWeight: 'bold',
        marginTop: '4px',
        visibility: message ? 'visible' : 'hidden',
    }

    if (message && touched) return <p style={errorStyle}>{message}</p>

    return <></>
}