import React, { useCallback } from 'react'
import { Modal } from '../../Components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../store/actions/noteAction';
import { MessageError } from '../../Components/MessageError/MessageError';


export const DeleteNote = ({ close, opened, id }) => {

    const dispatch = useDispatch()
    const deleteTodoActions = useCallback((id) => dispatch(deleteNote(id)));
    const error = useSelector(state => state.notes.deleteNote.error);
    const loading = useSelector(state => state.notes.deleteNote.loading);



    return (
        <Modal
            close={close}
            opened={opened}>

            <p className='note-delete-text'>Are you sure you want to delete note?</p>
            <div className='note-delete-div'>
                <button
                    onClick={() => deleteTodoActions(id)}
                    type='button'
                    className='delete-btn modal-delete'>
                    {loading ? <span>Deleting</span> : <span>Delete note&nbsp; <i class="fas fa-trash"></i></span>}
                </button>

                <button
                    onClick={close}
                    type='button'
                    className='cancel-btn'>
                    Cancel
                </button>
            </div>
            <MessageError error={error} />
        </Modal>
    )
}
