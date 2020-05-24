import React, { useState, useCallback, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { ProfileSchema } from '../ValidationSchemas/';
import { FormError } from '../../Components/FormError/FormError';
import { editProfile } from '../../store/actions/authAction';
import { MessageError } from '../../Components/MessageError/MessageError';
import profilePlaceholder from '../../images/profile.jpg';
import { EditProfileLoader } from '../../Components/Loader/EditProfileLoader';

export const UserProfile = () => {

    const firebase = useSelector(state => state.firebase);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();
    const myImg = useSelector(state => state.firebase.profile.cover)
    const loadingProfile = useSelector(state => state.auth.profileEdit.loading);

    // Edit Profile
    const editProfileAction = useCallback((values, image) => dispatch(editProfile(values, image)))
    const errorEdit = useSelector(state => state.auth.profileEdit.error);
    const userName = useSelector(state => state.firebase.profile.firstName);


    const [modalOpened, setModalOpened] = useState(false);


    if (!firebase.profile.isLoaded) return null;

    return (
        <div className='profile-content'>
            <div className="profile-container">
                <div className="title-edit">
                    <p>HI {userName}, here you can edit your profile</p>
                </div>

                {loadingProfile ? <EditProfileLoader /> :
                    <div className="image-title">

                        <div className="image-upload">
                            {!myImg
                                ? <img className='profile-image' src={profilePlaceholder} alt="profileImage" />
                                : <img className='profile-image' src={myImg} alt="profileImage" />}
                        </div>

                        <div className="input-group fileUpload">
                            <input
                                className='upload'
                                type="file"
                                onChange={(e) => setImage(e.currentTarget.files[0])} />
                            <span><i class="fas fa-camera"></i></span>
                        </div>
                    </div>}

                <Formik
                    initialValues={{
                        firstName: firebase.profile.firstName,
                        lastName: firebase.profile.lastName,
                        email: firebase.auth.email,
                        password: '',
                        confirmPassword: ''
                    }}
                    validateOnMount={true}
                    validationSchema={ProfileSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        editProfileAction(values, image)
                    }}
                >
                    {({ errors, values, touched, isValid, handleSubmit }) => (
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
                                {values.password.length > 8 ? <i class="fas fa-check checkIcon-rest"></i> : null}

                                <Field
                                    className='password-register'
                                    name='password'
                                    type="password"
                                    placeholder='New password' />
                                <FormError touched={touched.password} message={errors.password} />
                            </div>
                            <div className="input-group">
                                <i class="fas fa-unlock-alt iconPassword"></i>
                                {values.password.length > 8 ? <i class="fas fa-check checkIcon-rest"></i> : null}

                                <Field
                                    className='confirm-password'
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Re-type your new password...'
                                />
                                <FormError touched={touched.confirmPassword} message={errors.confirmPassword} />
                            </div>
                            <div className="input-group btn-reg">
                                <button
                                    className='edit-btn'
                                    disabled={!isValid}
                                    type="submit">
                                    Edit profile
                                </button>
                                <MessageError error={errorEdit} />
                            </div>

                            <div className="input-group">
                                <button
                                    type='button'
                                    className='delete-btn'
                                >
                                    Delete account &nbsp; <i className="fas fa-trash "></i>
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>



            </div>
        </div>
    )
}
