import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import profilePlaceholder from '../../images/profile.jpg';
import { slide as Menu } from 'react-burger-menu';


export const Navbar = () => {

    const firstName = useSelector(state => state.firebase.profile.firstName);
    const myImg = useSelector(state => state.firebase.profile.cover)



    return (
        <>
            <div className='navbar-container'>
                <div className="navbar-content">

                    <div className='logo-container'>
                        <p>HI! <span className='name-logo'>{firstName}</span> welcome on</p>
                        <h1>safeNotes<i class="fas fa-lock"></i></h1>
                    </div>

                    <div className="links">
                        <NavLink className='nav-link hvr-icon-buzz-out' to='/profile'>
                            {!myImg
                                ? <img className='nav-profile-image hvr-icon' src={profilePlaceholder} alt="profileImage" />
                                : <img className='nav-profile-image hvr-icon' src={myImg} alt="profileImage" />}

                        </NavLink>
                        <NavLink className='nav-link hvr-grow-rotate' to='/'>Notes</NavLink>
                        <NavLink className='nav-link logout hvr-icon-pulse' to='/logout'>Logout<i class="fas fa-sign-out-alt hvr-icon"></i></NavLink>
                    </div>
                </div>
            </div>


            {/* Burger menu */}
            <div className="outer-container">
                <Menu
                    width={180}
                    right
                    pageWrapId={'page-wrap'}
                    outerContainerId={'outer-container'}
                >
                    <p>Hi! {firstName}</p>
                    <NavLink className='nav-link hvr-icon-buzz-out' to='/profile'>
                        {!myImg
                            ? <img className='nav-profile-image hvr-icon' src={profilePlaceholder} alt="profileImage" />
                            : <img className='nav-profile-image hvr-icon' src={myImg} alt="profileImage" />}

                    </NavLink>
                    <NavLink className='nav-link hvr-grow-rotate' to='/'>Notes</NavLink>
                    <NavLink className='nav-link logout hvr-icon-pulse' to='/logout'>Logout <i class="fas fa-sign-out-alt hvr-icon"></i></NavLink>
                </Menu>
            </div>

        </>
    )
}
