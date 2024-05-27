import React, { useState } from 'react';
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import NavbarAdmi from "./NavbarAdmi";
import "../assets/css/CrearSala.css";



function CrearSala() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection('salas').add({
      nombre: nombre,
      descripcion: descripcion,
      capacidad: capacidad,
      ubicacion: ubicacion,
      disponibilidad: disponibilidad
    });
    navigate('/admin'); // Redirige al panel de admin después de crear la sala
  };

  return (
    <React.Fragment>
      <NavbarAdmi />
      <div className="crear-sala-container">
        <h1>Crear Nueva Sala</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Capacidad:</label>
            <input
              type="text"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ubicación:</label>
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
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
            <button type="submit" className="btn btn-primary">Crear Sala</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CrearSala;
