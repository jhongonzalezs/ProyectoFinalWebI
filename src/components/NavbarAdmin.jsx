import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import NavbarAdmi from "./NavbarAdmi";
import "../assets/css/NavbarAdmin.css";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Esto es necesario para accesibilidad

function NavbarAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [salas, setSalas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSala, setCurrentSala] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate('/login');
    }

    const fetchUsuarios = async () => {
      const snapshot = await db.collection('usuarios').get();
      setUsuarios(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchSalas = async () => {
      const snapshot = await db.collection('salas').get();
      setSalas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsuarios();
    fetchSalas();
  }, [navigate]);

  const eliminarSala = async (id) => {
    await db.collection('salas').doc(id).delete();
    setSalas(salas.filter(sala => sala.id !== id));
  };

  const abrirModal = (sala) => {
    setCurrentSala(sala);
    setNombre(sala.Nombre);
    setDescripcion(sala.Descripción);
    setCapacidad(sala.Capacidad);
    setUbicacion(sala.Ubicación);
    setDisponibilidad(sala.Disponibilidad);
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const handleModifySala = async (sala) => {
    const nuevoNombre = prompt("Nuevo nombre:", sala.nombre);
    const nuevaDescripcion = prompt("Nueva descripción:", sala.descripcion);
    const nuevaCapacidad = prompt("Nueva capacidad:", sala.capacidad);
    const nuevaUbicacion = prompt("Nueva ubicación:", sala.ubicacion);
    const nuevaDisponibilidad = prompt("Nueva disponibilidad (sí/no):", sala.disponibilidad ? 'sí' : 'no');

    if (nuevoNombre || nuevaDescripcion || nuevaCapacidad || nuevaUbicacion || nuevaDisponibilidad) {
      await db.collection('salas').doc(sala.id).update({
        nombre: nuevoNombre,
        descripcion: nuevaDescripcion,
        capacidad: nuevaCapacidad,
        ubicacion: nuevaUbicacion,
        disponibilidad: nuevaDisponibilidad.toLowerCase() === 'sí'
      });
      setSalas(salas.map(s => s.id === sala.id ? { ...s, nombre: nuevoNombre, descripcion: nuevaDescripcion, capacidad: nuevaCapacidad, ubicacion: nuevaUbicacion, disponibilidad: nuevaDisponibilidad.toLowerCase() === 'sí' } : s));
    }
  };

  return (
    <React.Fragment>
      <NavbarAdmi />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        <div className="section">
          <h2>Usuarios Registrados</h2>
          <div className="card-container">
            {usuarios.map(usuario => (
              <div key={usuario.id} className="card">
                <p><b>Nombre:</b> {usuario.nombres} {usuario.apellidos}</p>
                <p><b>Email:</b> {usuario.email}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Salas</h2>
          <div className="card-container">
            {salas.map(sala => (
              <div key={sala.id} className="card">
                <p><b>Nombre:</b> {sala.nombre}</p>
                <p><b>Descripción:</b> {sala.descripcion}</p>
                <p><b>Capacidad:</b> {sala.capacidad}</p>
                <p><b>Ubicación:</b> {sala.ubicacion}</p>
                <p><b>Disponibilidad:</b> {sala.disponibilidad ? 'Sí' : 'No'}</p>
                <div className="button-container">
                  <button onClick={() => handleModifySala(sala)} className="btn btn-primary">Modificar</button>
                  <button onClick={() => eliminarSala(sala.id)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Modificar Sala</h2>
        <form onSubmit={(e) => { e.preventDefault(); modificarSala(); }}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div>
            <label>Capacidad:</label>
            <input
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
            />
          </div>
          <div>
            <label>Ubicación:</label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </div>
          <div>
            <label>Disponibilidad:</label>
            <input
              type="checkbox"
              checked={disponibilidad}
              onChange={(e) => setDisponibilidad(e.target.checked)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            <button type="button" onClick={cerrarModal} className="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default NavbarAdmin;
