import * as actions from '../types';

/********* Add Note */
export const addNote = (data) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const firebase = getFirebase();

    dispatch({ type: actions.ADD_NOTE_START });

    try {
        const res = await firestore
            .collection('notes')
            .doc(userId)
            .get();

        const newNote = {
            id: new Date().valueOf(),
            todo: data.note,
            date: new Date()
        }

        if (!res.data()) {
            // If user not have note
            firestore
                .collection('notes')
                .doc(userId)
                .set({
                    notes: [newNote]
                })
        } else {
            //if user have note
            firestore
                .collection('notes')
                .doc(userId)
                .update({
                    notes: [...res.data().notes, newNote]
                })
        }
        dispatch({ type: actions.ADD_NOTE_SUCCESS });
        // return true;

    } catch (error) {
        console.log(error.message);

        dispatch({ type: actions.ADD_NOTE_FAIL, payload: error.message });
    }
}



/******** Delete Note */
export const deleteNote = id => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.DELETE_NOTE_START });
    try {
        const res = await firestore
            .collection('notes')
            .doc(userId)
            .get();

        const previousTodo = res.data().notes;
        // filter old notes and return new arr
        const newNotes = previousTodo.filter(note => note.id !== id);

        await firestore
            .collection('notes')
            .doc(userId)
            .update({
                notes: newNotes
            })
        dispatch({ type: actions.DELETE_NOTE_SUCCESS });
    } catch (error) {
        dispatch({ type: actions.DELETE_NOTE_FAIL, payload: error.message });
    }
}