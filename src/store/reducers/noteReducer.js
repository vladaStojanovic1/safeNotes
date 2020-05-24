import * as actions from '../types';

const initialState = {
    error: null,
    loading: false,

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


        default:
            return state;
    }
}