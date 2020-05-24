import React, { useState, useCallback } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase'

// Components
import { Modal } from '../../Components/Modal/Modal';
import { NotesSchema } from '../ValidationSchemas';
import { FormError } from '../../Components/FormError/FormError';
import noteModal from '../../images/note-modal2.png';
import { addNote } from '../../store/actions/noteAction';
import { MessageError } from '../../Components/MessageError/MessageError';

export const Notes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const addNoteAction = useCallback((data) => dispatch(addNote(data)));
    const error = useSelector(state => state.notes.error);
    const userId = useSelector(state => state.firebase.auth.uid);
    const userName = useSelector(state => state.firebase.profile.firstName);

    useFirestoreConnect([{
        collection: 'notes',
        doc: userId
    }])

    const myNotes = useSelector(
        ({ firestore: { data } }) => data.notes && data.notes[userId]
    )
    const notesLength = myNotes ? myNotes.notes.length : '0';

    return (
        <div className='notes-content'>

            <div className='notes-title'>
                <div>
                    <h2>Your Notes</h2>
                    <p>{userName} you have {notesLength} notes from now...</p>
                </div>

                <i onClick={() => setModalOpened(true)}
                    class="fas fa-plus-circle hvr-pop"></i>
            </div>

            <Modal
                close={() => setModalOpened(false)}
                opened={modalOpened}
            >

                <Formik initialValues={{
                    note: ''
                }}
                    validationSchema={NotesSchema}
                    validateOnMount={true}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        await addNoteAction(values);
                        setModalOpened(false)
                        setSubmitting(false)
                        resetForm();
                    }}>

                    {({ isSubmitting, touched, isValid, resetForm, onSubmit, errors, handleSubmit }) => (
                        <form className='note-form' onSubmit={handleSubmit}>

                            <div className="input-group">
                                <Field
                                    component="textarea" rows="14" cols="20"
                                    type='text'
                                    name='note'
                                    placeholder='Add your new note...'
                                    className='note-input'
                                />
                                <FormError touched={touched.note} message={errors.note} />

                            </div>

                            <div className="note-btn-div">
                                <div className="input-group">
                                    <button
                                        disabled={!isValid}
                                        className='modal-add-note-btn'
                                        type='submit'>
                                        Add note
                                </button>
                                </div>

                            </div>
                            <div className="x-modal-btn">
                                <button

                                    type='button'
                                    onClick={() => {
                                        setModalOpened(false);
                                        resetForm();
                                    }}>
                                    <i class="far fa-times-circle"></i>
                                </button>
                            </div>

                        </form>
                    )}

                </Formik>

                <img className='note-modal' src={noteModal} alt="" />
                <MessageError error={error} />
            </Modal>


        </div>
    )
}
