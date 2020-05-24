import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase'
import { Note } from './Note';
import { NotesLoader } from '../../Components/Loader/NotesLoader';


const DisplayNotes = () => {

    const userId = useSelector(state => state.firebase.auth.uid);
    const notes = useSelector(state => state.firestore.data.notes)

    useFirestoreConnect([{
        collection: 'notes',
        doc: userId
    }])

    const myNotes = useSelector(
        ({ firestore: { data } }) => data.notes && data.notes[userId]
    )

    let content;

    if (!notes) {
        content = <NotesLoader />

    } else if (!notes[userId] || !notes[userId].notes) {
        content =
            <div className='empty-notes-content'>
                <h2>You don't have notes..</h2>
                <h2 className='app-title-empty'><span>Write your</span> SafeNotes<i class="fas fa-lock"></i></h2>
            </div>

    } else if (myNotes.notes.length < 1) {
        content =
            <div className='empty-notes-content'>
                <h2>You don't have notes..</h2>
                <h2 className='app-title-empty'><span>Write your</span> SafeNotes<i class="fas fa-lock"></i></h2>
            </div>

    }
    else {
        content = (
            myNotes.notes
                .slice(0)
                .reverse()
                .map(note => <Note key={note.id} note={note} />)
        )
    }


    return (
        <div className='note-content'>
            {content}
        </div>
    )
}


export default DisplayNotes;