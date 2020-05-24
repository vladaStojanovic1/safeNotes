import * as actions from '../types'

const initialState = {
    error: null,
    loading: false,
    verifyEmail: {
        error: null,
        loading: false
    },
    profileEdit: {
        error: null,
        loading: false
    },

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
        case actions.VERIFY_START:
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    loading: true
                }

            }
        case actions.VERIFY_SUCCESS:
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    error: false,
                    loading: false
                }
            }
        case actions.VERIFY_FAIL:
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    error: payload,
                    loading: false
                }
            }
        case actions.PROFILE_START:
            return {
                ...state,
                profileEdit: {
                    ...state.profileEdit,
                    loading: true
                }
            }
        case actions.PROFILE_SUCCESS:
            return {
                ...state,
                profileEdit: {
                    ...state.profileEdit,
                    error: false,
                    loading: false
                }
            }
        case actions.PROFILE_FAIL:
            return {
                ...state,
                profileEdit: {
                    ...state.profileEdit,
                    error: payload,
                    loading: false
                }
            }


        default:
            return state;
    }
}