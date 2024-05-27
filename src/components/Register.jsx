import React from 'react';
import '../assets/css/Form.css';
import { auth, db } from "../firebase";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";


function Register() {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [nombres, setNombres] = React.useState('');
  const [apellidos, setApellidos] = React.useState('');
  const [error, setError] = React.useState(null);
  const [modoRegistro, setModoRegistro] = React.useState(true);

  const guardarUsuarios = async (event) => {
    event.preventDefault();
    setError(null);

    if (!email || !pass || !nombres || !apellidos) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log('Usuario creado:', res.user);

      await db.collection('usuarios').doc(res.user.uid).set({
        nombres: nombres,
        apellidos: apellidos,
        email: res.user.email,
        password: pass,
        id: res.user.uid
      });

      console.log('Usuario guardado en Firestore');
      setEmail('');
      setPass('');
      setNombres('');
      setApellidos('');
      setError(null);
    } catch (error) {
      console.log('Error en registro:', error.code, error.message);
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <Navbar /> {/* Renderiza el componente Navbar */}
      <form onSubmit={guardarUsuarios}>
        <div className="col-md-6 right">
          <div className="input-box">
            <header>Create account</header>
            <div className="input-field">
              <input type="text" className="input" id="nombres" autoComplete="on"
                onChange={e => setNombres(e.target.value)} required />
              <label htmlFor="nombres">Nombres</label>
            </div>
            <div className="input-field">
              <input type="text" className="input" id="apellidos" autoComplete="on"
                onChange={e => setApellidos(e.target.value)} required />
              <label htmlFor="apellidos">Apellidos</label>
            </div>
            <div className="input-field">
              <input type="email" className="input" id="email" autoComplete="on"
                onChange={e => setEmail(e.target.value)} required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input type="password" className="input" id="pass"
                onChange={e => setPass(e.target.value)} required />
              <label htmlFor="pass">Password</label>
            </div>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">Registrarse</button>
              <div class="signin">
                    <span>I already have an account <a><Link to="/login">Login Here</Link></a></span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default Register;
