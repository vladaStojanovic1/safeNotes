import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authAction';

export const Logout = () => {

    const dispatch = useDispatch();
    const logoutAction = useCallback(() => dispatch(logout()))

    useEffect(() => {
        logoutAction()
    }, [logoutAction])

    return null;
}
