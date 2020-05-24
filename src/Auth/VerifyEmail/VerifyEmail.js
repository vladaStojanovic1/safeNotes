import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../store/actions/authAction';
import { MessageError } from '../../Components/MessageError/MessageError';

export const VerifyEmail = () => {

    const dispatch = useDispatch();
    const sendVerification = useCallback(() => dispatch(verifyEmail()));
    const error = useSelector(state => state.auth.verifyEmail.error);
    const firstName = useSelector(state => state.firebase.profile.firstName);
    const email = useSelector(state => state.firebase.auth.email);



    return (
        <div className='verify-content'>
            <div className="verify-container">
                <p className='text-verify'>
                    <span className='user-info'>{firstName} </span>
                 thank you for joining us! We just need you to verify your
                 <span className='user-info-email'> {email} </span>
                 address to complete setting up your account and begin to write your
                 <span className='app-title'> SafeNotes<i class="fas fa-lock"></i></span></p>
                <button onClick={sendVerification}>
                    Re-send verification email &nbsp;
                <i class="fas fa-paper-plane"></i>
                </button>
                <MessageError error={error} />
            </div>
        </div>
    )
}
