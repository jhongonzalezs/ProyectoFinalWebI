import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';  // Importa Link
import '../assets/css/Form.css';
import { auth, db } from "../firebase";
import Navbar from "./Navbar";

Modal.setAppElement('#root'); // Esto es necesario para accesibilidad

function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
      openModal();  // Abrir el modal al completar el registro
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
              <div className="signin">
                <span>I already have an account <Link to="/login">Login Here</Link></span>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registro Exitoso"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Usuario registrado correctamente</h2>
        <Link to="/login">
          <button onClick={closeModal}>Cerrar</button>
        </Link>
      </Modal>
    </React.Fragment>
  );
}

export default Register;
