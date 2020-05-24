import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/****** Components */
import { Login } from '../Auth/Login/Login';
import { SignUp } from '../Auth/SignUp/SignUp';



export const Routes = () => {
    const loggedIn = useSelector(state => state.firebase.auth.uid)
    const emailVerified = useSelector(state => state.firebase.auth.emailVerified);

    let routes;

    // when user logged in but not verified
    if (loggedIn && !emailVerified) {
        routes = (
            <Switch>
                <Redirect to='/' />
            </Switch>
        )

        // when user logged in and verified
    } else if (loggedIn && emailVerified) {
        routes = (
            <Switch>

            </Switch>
        )

    } else {
        routes = (
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Redirect to='/' />
            </Switch>
        )
    }

    return (
        <div className={loggedIn ? 'loggedIn-content' : null}>

            {routes}
        </div>
    )
}
