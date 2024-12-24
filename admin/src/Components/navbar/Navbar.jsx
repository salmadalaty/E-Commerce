
import profile from '../../Assets/Admin_Assets/nav-profile.svg'
import logo1 from '../../Assets/Admin_Assets/nav-logo.svg'
import React from 'react'
import './navbar.css'

const Navbar = () => {
    return (
        <div className='nav'>
            <img src={logo1} alt="" className='logo' />
            <img src={profile} alt="" className='profile' />
        </div>
    )
}

export default Navbar
