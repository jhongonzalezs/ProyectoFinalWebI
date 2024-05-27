import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase"; // Asegúrate de importar tu configuración de Firebase correctamente
import '../assets/css/Form.css';
import Navar from './Navbar';

function Login() {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const login = React.useCallback(async (event) => {
    event.preventDefault();
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res.user);

      // Obtener datos del usuario desde Firestore
      const userDoc = await db.collection('usuarios').doc(res.user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        localStorage.setItem('userName', userData.nombres); // Almacena el nombre en localStorage
      }

      setEmail('');
      setPass('');
      setError(null);

      if (email.toLowerCase() === 'admin@gmail.com' && pass === 'admin1234') {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Email no válido');
      } else if (error.code === 'auth/user-not-found') {
        setError('Email no registrado');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
      } else {
        setError('Error al iniciar sesión');
      }
    }
  }, [email, pass, navigate]);

  return (
    <React.Fragment>
      <Navar/>
      <form onSubmit={login}>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Ingresar</header>
            <div className="input-field">
              <input
                type="email"
                className="input"
                id="email"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                className="input"
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
              />
              <label htmlFor="pass">Password</label>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
              <div className="signin">
                <span>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Login;
