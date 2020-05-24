import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as actions from '../../store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

/****** Components */
import { FormError } from '../../Components/FormError/FormError';
import { LoginSchema } from '../ValidationSchemas';
import { MessageError } from '../../Components/MessageError/MessageError';
import { LoginLoader } from '../../Components/Loader/LoginLoader';
import { cleanMessage } from '../../store/actions/authAction';


export const Login = () => {

    const dispatch = useDispatch();
    const loginAction = useCallback((data) => dispatch(actions.login(data)));
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);
    const cleanMessageAction = useCallback(() => dispatch(cleanMessage()))


    useEffect(() => {
        return () => {
            cleanMessageAction()
        }
    }, [])


    return (
        <div className='login-content'>
            <div className="login-container">
                <div className="logo">
                    <div className='my-logo-text'>
                        <h2>Welcome</h2>
                        <span className='app-title'>SafeNotes</span>
                        <i class="fas fa-lock"></i>
                    </div>
                </div>

                <div className="login-form">
                    <Formik
                        validateOnMount={true}
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            loginAction(values);
                            resetForm();
                        }}
                    >
                        {({ errors, touched, isValid, handleSubmit }) => {
                            return (
                                <form className='login-form' onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <i class="fas fa-envelope iconEmail"></i>
                                        {isValid ? <i class="fas fa-check checkIcon"></i> : null}
                                        <Field
                                            className='email-input'
                                            name='email'
                                            type="email"
                                            placeholder='Enter email' />
                                        <FormError touched={touched.email} message={errors.email} />
                                    </div>
                                    <div className="input-group">
                                        <i class="fas fa-key iconPassword"></i>
                                        {isValid ? <i class="fas fa-check checkIcon"></i> : null}
                                        <Field
                                            className='password-input'
                                            name='password'
                                            type="password"
                                            placeholder='Enter password' />
                                        <FormError touched={touched.password} message={errors.password} />
                                    </div>
                                    <div className="input-group">
                                        <button
                                            className='login-btn'
                                            disabled={!isValid}
                                            type="submit"
                                        >
                                            {!isValid ? <i class="fas fa-ban"></i> : 'Login'}

                                        </button>
                                        <MessageError error={error} />
                                    </div>
                                    {loading ? <LoginLoader /> : null}

                                </form>
                            )
                        }}
                    </Formik>
                </div>

                <div className="register">
                    <h3>Have no account on <span className='app-title'>SafeNotes</span> ?</h3>
                    <Link className='btn-register' to='/signup'>Get registered</Link>
                </div>
            </div>
        </div>
    )
}
