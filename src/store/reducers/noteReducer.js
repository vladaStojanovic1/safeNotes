import * as actions from '../types';

const initialState = {
    error: null,
    loading: false,
    deleteNote: {
        error: null,
        loading: false
    }
}


export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.ADD_NOTE_START:
            return {
                ...state,
                loading: true,
            }
        case actions.ADD_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case actions.ADD_NOTE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case actions.DELETE_NOTE_START:
            return {
                ...state,
                deleteNote: {
                    ...state.deleteNote,
                    loading: true
                }
            }
        case actions.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                deleteNote: {
                    ...state.deleteNote,
                    loading: false,
                    error: false
                }
            }
        case actions.DELETE_NOTE_FAIL:
            return {
                ...state,
                deleteNote: {
                    ...state.deleteNote,
                    loading: false,
                    error: payload
                }
            }

        default:
            return state;
    }
}