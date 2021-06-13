import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/NavbarStyles.css"

export const Nav = ({ handleLogout }) => (
    <nav className="nav">
        <h1>Trip Planner</h1>
        <ul>
            <li><Link to="/profile">Home </Link></li>
            <li><Link to="/tripDetails">Trip Details </Link></li>
            <li onClick={() => handleLogout()}><Link>Sign Out</Link></li>
        </ul>

    </nav >
)