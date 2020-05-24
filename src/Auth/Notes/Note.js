import React, { useState } from 'react';
import pin from '../../images/pin.png';
import moment from 'moment';
import { DeleteNote } from './DeleteNote';

export const Note = ({ note }) => {

    const convertDate = moment(note.date.toDate()).fromNow();
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <div className='note-card'>
                <img className='note-ui' src={pin} alt="noteUi" />
                <p>{note.todo}</p>

                <div className='note-date'>
                    <i class="far fa-clock"></i>
                    <p>{convertDate}</p>
                </div>
                <i onClick={() => setModalOpened(true)} class="fas fa-trash-alt hvr-grow-rotate"></i>
            </div>

            <DeleteNote
                id={note.id}
                close={() => setModalOpened(false)}
                opened={modalOpened} />
        </>
    )
}
