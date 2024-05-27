import React from 'react';
import '../assets/css/Navbar.css';
import { Link } from 'react-router-dom';
import menu from '../assets/img/menu.png';
import logo from '../assets/img/logo.png';
import loan from '../assets/img/loan.png';

function Navbar() {
    return (
        <header>
            <div className="menu container">
                <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
                <input type="checkbox" id="menu" />
                <label htmlFor="menu"><img src={menu} className="menu-icono" alt="menu" /></label>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Registrar</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="header-content container">
                <div className="header-txt">
                    <h1 style={{ color: '#272D38' }}><b>El deporte te transforma. Únete a nuestra comunidad.</b></h1>
                    <p style={{ color: '#272D38' }}>Vive la experiencia universitaria. Deporte, salud y bienestar.</p>
                    <div className="botones">
                        <Link to="/login" className="btn-1">Iniciar sesión</Link>
                    </div>
                </div>

                <div className="header-img">
                    <img src={loan} className="buss" alt="loan" />
                </div>
            </div>
        </header>
    )
}

export default Navbar;
