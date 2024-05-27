import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Asegúrate de importar tu configuración de Firebase correctamente
import '../assets/css/Navbar.css';
import menu from '../assets/img/menu.png';
import logo from '../assets/img/logo.png';
import loan from '../assets/img/loan.png';

function NavbarAll() {
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userName'); // Eliminar el nombre de usuario almacenado
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header>
      <div className="menu container">
        <a><Link to="/user"><img src={logo} className="logo" alt="" /></Link></a>
        <input type="checkbox" id="menu" />
        <label htmlFor="menu"><img src={menu} className="menu-icono" alt="menu" /></label>
        <nav className="navbar">
          <ul className="ul">
            <li className="li"><Link to="/user">Salas</Link></li>
            <li><button onClick={handleLogout} className="logout">Salir</button></li>
          </ul>
        </nav>
      </div>

      <div className="header-content container">
        <div className="header-txt">
          <h1 style={{ color: '#272D38' }}><b>El deporte te transforma. Únete a nuestra comunidad.</b></h1>
          <p style={{ color: '#272D38' }}>Vive la experiencia universitaria. Deporte, salud y bienestar.</p>
          {userName && <h2>Bienvenido, {userName}!</h2>}
          <div className="botones">
            <a className="btn-1"><li><Link to="/user">Salas</Link></li></a>
          </div>
        </div>

        <div className="header-img">
          <img src={loan} className="buss" alt="" />
        </div>
      </div>
    </header>
  );
}

export default NavbarAll;