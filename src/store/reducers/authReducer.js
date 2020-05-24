import * as actions from '../types'

const initialState = {
    error: null,
    loading: false,

}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false
            }
        case actions.AUTH_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case actions.AUTH_END:
            return {
                ...state,
                loading: false
            }


        default:
            return state;
    }
}