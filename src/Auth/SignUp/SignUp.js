import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/authAction';

// Components
import { SignUpSchema } from '../ValidationSchemas';
import { FormError } from '../../Components/FormError/FormError';
import { MessageError } from '../../Components/MessageError/MessageError';
import { LoginLoader } from '../../Components/Loader/LoginLoader';

export const SignUp = () => {

    const dispatch = useDispatch();
    const signUpAction = useCallback((data) => dispatch(actions.signUp(data)));
    const error = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.loading);


    return (
        <div className='signup-content'>
            <div className="register-container">
                <div className="title-register">
                    <p>Come join our <span className='app-title'>SafeNotes<i class="fas fa-lock"></i></span> app!<br /> Let's set up your account</p>

                </div>
                <div className="register-form">
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validateOnMount={true}
                        validationSchema={SignUpSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            signUpAction(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched, isValid, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="first-last-name">
                                    <div className="input-group">
                                        <i class="fas fa-user"></i>
                                        {isValid ? <i class="fas fa-check checkIcon-name"></i> : null}
                                        <Field
                                            className='firstName'
                                            type='text'
                                            name='firstName'
                                            placeholder='First name...' />
                                        <FormError touched={touched.firstName} message={errors.firstName} />
                                    </div>
                                    <div className="input-group">
                                        <i class="fas fa-user"></i>
                                        {isValid ? <i class="fas fa-check checkIcon-name"></i> : null}
                                        <Field
                                            className='lastName'
                                            type='text'
                                            name='lastName'
                                            placeholder='Last name...' />
                                        <FormError touched={touched.lastName} message={errors.lastName} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <i class="fas fa-envelope iconEmail"></i>
                                    {isValid ? <i class="fas fa-check checkIcon-rest"></i> : null}
                                    <Field
                                        className='email-register'
                                        name='email'
                                        type="email"
                                        placeholder='Email' />
                                    <FormError touched={touched.email} message={errors.email} />
                                </div>
                                <div className="input-group">
                                    <i class="fas fa-key iconPassword"></i>
                                    {isValid ? <i class="fas fa-check checkIcon-rest"></i> : null}
                                    <Field
                                        className='password-register'
                                        name='password'
                                        type="password"
                                        placeholder='Password' />
                                    <FormError touched={touched.password} message={errors.password} />
                                </div>
                                <div className="input-group">
                                    <i class="fas fa-unlock-alt iconPassword"></i>
                                    {isValid ? <i class="fas fa-check checkIcon-rest"></i> : null}
                                    <Field
                                        className='confirm-password'
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='Re-type your password...'
                                    />
                                    <FormError touched={touched.confirmPassword} message={errors.confirmPassword} />
                                </div>
                                <div className="input-group btn-reg">
                                    <button
                                        className='register-btn'
                                        disabled={!isValid}
                                        type="submit">
                                        {!isValid ? <i class="fas fa-ban"></i> : 'Join'}
                                    </button>
                                    <MessageError error={error} />
                                </div>
                                {loading ? <LoginLoader /> : null}

                            </form>
                        )}
                    </Formik>
                </div>

                <div className="back-to-login">
                    <p>Already have an account?</p>&nbsp;
                    <Link to='/'>Login here</Link>
                </div>

            </div>
        </div>
    )
}
